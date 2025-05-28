import { Injectable } from '@nestjs/common';
import { CreateSurveyDto } from '../dtos/create-survey.dto';
import { SurveysRepository } from '../repositories/surveys.repository';

@Injectable()
export class SurveysService {
  constructor(private readonly surveysRepository: SurveysRepository) {}

  createSurvey(dto: CreateSurveyDto) {
    return this.surveysRepository.save(dto);
  }
}
