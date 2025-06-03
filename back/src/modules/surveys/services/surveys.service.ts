import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSurveyDto } from '../dtos/create-survey.dto';
import { UpdateSurveyDto } from '../dtos/update-survey.dto';
import { SurveysRepository } from '../repositories/surveys.repository';
import { Question } from '../entities/question.entity';
import { Option } from '../entities/option.entity';
import { Survey } from '../entities/survey.entity';
import { SurveyStatus } from '../enums/survey-status.enum';

@Injectable()
export class SurveysService {
  constructor(
    private readonly surveysRepository: SurveysRepository
  ) {}

  createSurvey(dto: CreateSurveyDto) {
    return this.surveysRepository.save(dto);
  }

  async getSurveyById (id: string): Promise<Survey> {
    const survey = await this.surveysRepository.findByIdWithQuestions(id);
    if (!survey) {
      throw new NotFoundException(`Survey with id ${id} not found`);
    }
    return survey;
  }

  async getSurveysByStatus (status: SurveyStatus): Promise<Survey[]> {
    return this.surveysRepository.findByStatus(status);
  }

  async updateSurvey(id: string, dto: UpdateSurveyDto) {
    const survey = await this.surveysRepository.findByIdWithQuestions(id);
    if (!survey) {
      throw new NotFoundException(`Survey ${id} not found`);
    }
  
    // Actualizar título
    survey.title = dto.title;
  
    const existingQuestions = new Map(
      survey.questions.map((q) => [q.id, q]),
    );
  
    const updatedQuestions: Question[] = [];
    
    for (const qDto of dto.questions) {
      let question: Question;
      // Actualizar pregunta
      if (qDto.id && existingQuestions.has(qDto.id)) {
        question = existingQuestions.get(qDto.id)!;
        question.text = qDto.text;
        question.type = qDto.type;
        question.options = qDto.options?.map((opt) => {
          const option = new Option();
          option.text = opt.text;
          return option;
        }) || [];
  
        existingQuestions.delete(qDto.id);
      } else {
        // Nueva pregunta
        question = {
          text: qDto.text,
          type: qDto.type,
          options: qDto.options?.map((opt) => ({ text: opt.text })) || [],
          survey,
        } as Question;
      }
  
      updatedQuestions.push(question);
    }
  
    // Las que quedaron en existingQuestions se eliminan
    survey.questions = updatedQuestions;
  
    return this.surveysRepository.saveEntity(survey);
  }

  async deleteSurvey (id: string): Promise<void> {
    const found = await this.surveysRepository.findByIdWithQuestions(id);

    if (!found) {
      throw new NotFoundException(`Survey with id ${id} not found`);
    }

    await this.surveysRepository.delete(id);
  }
}
