import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubmitSurveyAnswersDto } from '../dtos/create-answer.dto';
import { AnswersRepository } from '../repositories/answers.repository';
import { ResponsesRepository } from '../repositories/responses.repository';
import { Question } from '../entities/question.entity';
import { Answer } from '../entities/answer.entity';
import { SurveyStatus } from '../enums/survey-status.enum';
import { Survey } from '../entities/survey.entity';
import { EmailService } from './email.service';

@Injectable()
export class AnswersService {
  constructor(
    private readonly answersRepo: AnswersRepository,
    private readonly responsesRepo: ResponsesRepository,
    private readonly emailService: EmailService,
    @InjectRepository(Question)
    private readonly questionsRepo: Repository<Question>,
    @InjectRepository(Survey)
    private readonly surveysRepo: Repository<Survey>
  ) { }

  async createAnswers (
    surveyId: string,
    dto: SubmitSurveyAnswersDto
  ): Promise<{ success: boolean; message: string }> {
    const { email, questions } = dto;

    if (!questions.length) {
      throw new BadRequestException('Questions array is empty');
    }

    const survey = await this.surveysRepo.findOne({
      where: { id: surveyId },
      relations: ['questions'],
    });

    if (!survey) {
      throw new NotFoundException(`Survey not found: ${surveyId}`);
    }

    if (survey.status !== SurveyStatus.PUBLISHED) {
      throw new BadRequestException('Survey is not available for answers');
    }

    const response = await this.responsesRepo.save({ survey });

    const answers: Answer[] = [];

    for (const q of questions) {
      const question = await this.questionsRepo.findOne({
        where: { id: q.id },
        relations: ['survey', 'options'],
      });

      if (!question) {
        throw new NotFoundException(`Question not found: ${q.id}`);
      }

      if (question.survey.id !== surveyId) {
        throw new BadRequestException(`Question ${q.id} does not belong to survey ${surveyId}`);
      }

      const answerEntity = new Answer();
      answerEntity.question = question;
      answerEntity.response = response;

      switch (question.type) {
        case 'OPEN':
          if (typeof q.answer !== 'string') {
            throw new BadRequestException(`Expected string for OPEN question ${q.id}`);
          }
          answerEntity.text = q.answer;
          break;

        case 'SINGLE_CHOICE':
          if (typeof q.answer !== 'string') {
            throw new BadRequestException(`Expected string for SINGLE_CHOICE question ${q.id}`);
          }
          const selectedOption = question.options.find(opt => opt.text === q.answer);
          if (!selectedOption) {
            throw new BadRequestException(`Option "${q.answer}" not found for question ${q.id}`);
          }
          answerEntity.selectedOption = selectedOption;
          break;

        case 'MULTIPLE_CHOICE':
          if (!Array.isArray(q.answer)) {
            throw new BadRequestException(`Expected array for MULTIPLE_CHOICE question ${q.id}`);
          }
          const selectedOptions = question.options.filter(opt => q.answer.includes(opt.text));
          if (selectedOptions.length !== q.answer.length) {
            throw new BadRequestException(`Some options not found for MULTIPLE_CHOICE question ${q.id}`);
          }
          answerEntity.selectedOptions = selectedOptions;
          break;

        default:
          throw new BadRequestException(`Unsupported question type: ${question.type}`);
      }

      answers.push(answerEntity);
    }

    await this.answersRepo.saveAll(answers);

    await this.emailService.sendSurveyConfirmation(email, survey.title);

    return {
      success: true,
      message: 'Éxito al responder encuesta',
    };
  }
}  
