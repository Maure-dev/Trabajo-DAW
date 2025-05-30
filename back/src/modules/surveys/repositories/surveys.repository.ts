import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Survey } from '../entities/survey.entity';
import { CreateSurveyDto } from '../dtos/create-survey.dto';

@Injectable()
export class SurveysRepository {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepo: Repository<Survey>,
  ) {}

  async save(dto: CreateSurveyDto) {
    const survey = this.surveyRepo.create({
      title: dto.title,
      questions: dto.questions.map((q) => ({
        text: q.text,
        type: q.type,
        options: q.options?.map((opt) => ({ text: opt.text })) || [],
      })),
    });

    return await this.surveyRepo.save(survey);
  }
}
