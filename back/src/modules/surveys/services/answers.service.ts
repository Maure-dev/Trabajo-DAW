import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnswerDto } from '../dtos/create-answer.dto';
import { AnswersRepository } from '../repositories/answers.repository';
import { ResponsesRepository } from '../repositories/responses.repository';
import { Question } from '../entities/question.entity';
import { Answer } from '../entities/answer.entity';
import { Response } from '../entities/response.entity';

@Injectable()
export class AnswersService {
  constructor(
    private readonly answersRepo: AnswersRepository,
    private readonly responsesRepo: ResponsesRepository,
    @InjectRepository(Question)
    private readonly questionsRepo: Repository<Question>,
  ) { }

  async createAnswers (dtos: CreateAnswerDto[]): Promise<Response> {
    if (!dtos.length) throw new BadRequestException('Empty answers array');

    const firstQuestion = await this.questionsRepo.findOne({
      where: { id: dtos[0].questionId },
      relations: ['survey'],
    });
    if (!firstQuestion) throw new NotFoundException(`Question not found: ${dtos[0].questionId}`);

    const survey = firstQuestion.survey;

    const response: Response = await this.responsesRepo.save({ survey });

    const answers: Answer[] = [];

    for (const dto of dtos) {
      const question = await this.questionsRepo.findOne({ where: { id: dto.questionId } });
      if (!question) throw new NotFoundException(`Question not found: ${dto.questionId}`);

      switch (question.type) {
        case 'OPEN':
          if (!dto.text) throw new BadRequestException(`Text is required for open question ${dto.questionId}`);
          break;
        case 'SINGLE_CHOICE':
          if (!dto.selectedOptionId) throw new BadRequestException(`Option ID is required for single choice question ${dto.questionId}`);
          break;
        case 'MULTIPLE_CHOICE':
          if (!dto.selectedOptionIds || dto.selectedOptionIds.length < 1) {
            throw new BadRequestException(`At least one option is required for multiple choice question ${dto.questionId}`);
          }
          break;
        default:
          throw new BadRequestException(`Invalid question type for question ${dto.questionId}`);
      }

      const answer: Answer = await this.answersRepo.createWithResponse(dto, response);
      answers.push(answer);
    }

    await this.answersRepo.saveAll(answers);

    const detailedResponse = await this.responsesRepo.findDetailedById(response.id);
    if (!detailedResponse) {
      throw new NotFoundException(`Response not found after creation`);
    }
    return detailedResponse;
  }
}
