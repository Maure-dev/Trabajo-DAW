import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnswerDto } from '../dtos/create-answer.dto';
import { AnswersRepository } from '../repositories/answers.repository';
import { Question } from '../entities/question.entity';
import { Answer } from '../entities/answer.entity';

@Injectable()
export class AnswersService {
  constructor(
    private readonly answersRepo: AnswersRepository,
    @InjectRepository(Question)
    private readonly questionsRepo: Repository<Question>,
  ) { }

  async createAnswers (dtos: CreateAnswerDto[]): Promise<Answer[]> {
    const savedAnswers: Answer[] = [];

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

      const saved = await this.answersRepo.save(dto);
      savedAnswers.push(saved);
    }

    return savedAnswers;
  }
}
