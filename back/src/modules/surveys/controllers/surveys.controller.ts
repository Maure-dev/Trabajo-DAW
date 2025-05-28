import { Body, Controller, Post } from '@nestjs/common';
import { CreateSurveyDto } from '../dtos/create-survey.dto';
import { SurveysService } from '../services/surveys.service';

@Controller('surveys')
export class SurveysController {
  constructor(private readonly surveysService: SurveysService) {}

  @Post()
  create(@Body() createSurveyDto: CreateSurveyDto) {
    return this.surveysService.createSurvey(createSurveyDto);
  }
}
