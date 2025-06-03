import { Body, Controller, Post } from '@nestjs/common';
import { CreateAnswerDto } from '../dtos/create-answer.dto';
import { AnswersService } from '../services/answers.service';
import { Response } from '../entities/response.entity';

@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) { }

  @Post()
  create (@Body() dtos: CreateAnswerDto[]): Promise<Response> {
    return this.answersService.createAnswers(dtos);
  }
}
