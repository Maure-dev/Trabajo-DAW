import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Survey } from '../entities/survey.entity';
import { CreateSurveyDto } from '../dtos/create-survey.dto';
import { SurveyStatus } from '../enums/survey-status.enum';

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

  async findByIdWithQuestions (id: string): Promise<Survey | null> {
    return this.surveyRepo.findOne({
      where: { id },
      relations: ['questions', 'questions.options'],
    });
  }

  async findByStatus (status: SurveyStatus): Promise<Survey[]> {
    return this.surveyRepo.find({
      where: { status },
      relations: ['questions', 'questions.options'],
    });
  }
  
  async saveEntity (survey: Survey): Promise<Survey> {
    return await this.surveyRepo.save(survey);
  }

  async delete (id: string): Promise<void> {
    await this.surveyRepo.delete(id);
  }
}
