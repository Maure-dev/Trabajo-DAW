import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Answer } from '../entities/answer.entity';
import { CreateAnswerDto } from '../dtos/create-answer.dto';
import { Option } from '../entities/option.entity';

@Injectable()
export class AnswersRepository {
  constructor(
    @InjectRepository(Answer)
    private readonly repo: Repository<Answer>,
    @InjectRepository(Option)
    private readonly optionRepo: Repository<Option>,
  ) { }

  async save (dto: CreateAnswerDto): Promise<Answer> {
    const answer = this.repo.create({
      question: { id: dto.questionId },
      text: dto.text,
    });

    // Para SINGLE_CHOICE
    if (dto.selectedOptionId) {
      answer.selectedOption = { id: dto.selectedOptionId } as Option;
    }

    // Para MULTIPLE_CHOICE
    if (dto.selectedOptionIds) {
      const options = await this.optionRepo.findBy({ id: In(dto.selectedOptionIds) });
      answer.selectedOptions = options;
    }

    return await this.repo.save(answer);
  }
}
