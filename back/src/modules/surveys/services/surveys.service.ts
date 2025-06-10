import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateSurveyDto } from '../dtos/create-survey.dto';
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

  async updateSurvey (id: string, dto: CreateSurveyDto) {
    const survey = await this.surveysRepository.findByIdWithQuestions(id);
    if (!survey) throw new NotFoundException(`Survey ${id} not found`);

    survey.title = dto.title;
    survey.expiresAt = new Date(dto.duration);

    // Eliminar todas las preguntas anteriores
    survey.questions = [];

    for (const qDto of dto.questions) {
      const question = new Question();
      question.text = qDto.text;
      question.type = qDto.type;
      question.survey = survey;

      question.options = (qDto.options || []).map(optDto => {
        const option = new Option();
        option.text = optDto.text;
        option.question = question;
        return option;
      });

      survey.questions.push(question);
    }

    return await this.surveysRepository.saveEntity(survey);
  }
  

  async deleteSurvey (id: string): Promise<void> {
    const found = await this.surveysRepository.findByIdWithQuestions(id);

    if (!found) {
      throw new NotFoundException(`Survey with id ${id} not found`);
    }

    await this.surveysRepository.delete(id);
  }

  async changeSurveyStatus (id: string): Promise<Survey> {
    const survey = await this.surveysRepository.findByIdWithQuestions(id);

    if (!survey) {
      throw new NotFoundException(`Survey with id ${id} not found`);
    }

    if (!survey.questions || survey.questions.length === 0) {
      throw new BadRequestException('Survey must have at least one question to change status');
    }

    switch (survey.status) {
      case SurveyStatus.DRAFT:
        survey.status = SurveyStatus.PUBLISHED;
        survey.linkParticipation = randomUUID();
        survey.linkResults = randomUUID();
        break;

      case SurveyStatus.PUBLISHED:
        survey.status = SurveyStatus.CLOSED;
        break;

      case SurveyStatus.CLOSED:
        throw new BadRequestException('Survey is already closed');
    }

    return await this.surveysRepository.saveEntity(survey);
  }

  async getSurveyForParticipation (link: string): Promise<Survey> {
    const survey = await this.surveysRepository.findByParticipationLink(link);

    if (!survey) {
      throw new NotFoundException('Survey not found for participation');
    }

    return survey;
  }

  async getSurveyResults (link: string): Promise<Survey> {
    const survey = await this.surveysRepository.findByResultsLink(link);

    if (!survey) {
      throw new NotFoundException('Survey not found for results');
    }

    return survey;
  }
}
