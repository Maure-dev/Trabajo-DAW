import { Body, Controller, Post } from '@nestjs/common';
import { CreateAnswerDto } from '../dtos/create-answer.dto';
import { AnswersService } from '../services/answers.service';
import { Answer } from '../entities/answer.entity';

@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) { }

  @Post()
  create (@Body() dtos: CreateAnswerDto[]): Promise<Answer[]> {
    return this.answersService.createAnswers(dtos);
  }
}
