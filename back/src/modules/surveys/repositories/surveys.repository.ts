import { Injectable } from '@nestjs/common';
import { CreateSurveyDto } from '../dtos/create-survey.dto';

@Injectable()
export class SurveysRepository {
  save(dto: CreateSurveyDto) {
    console.log('Saving survey to DB:', dto);
    return { message: 'Survey saved (mock)', data: dto };
  }
}
