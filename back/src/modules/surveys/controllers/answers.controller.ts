import { Param, Body, Controller, Post, ParseUUIDPipe } from '@nestjs/common';
import { SubmitSurveyAnswersDto } from '../dtos/create-answer.dto';
import { AnswersService } from '../services/answers.service';

@Controller('surveys/answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) { }

  @Post(':surveyId')
  create (
    @Param('surveyId', ParseUUIDPipe) surveyId: string,
    @Body() dtos: SubmitSurveyAnswersDto,
  ): Promise<{ success: boolean; message: string }> {
    return this.answersService.createAnswers(surveyId, dtos);
  }
}

