import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from '../entities/response.entity';

@Injectable()
export class ResponsesRepository {
  constructor(
    @InjectRepository(Response)
    private readonly repo: Repository<Response>,
  ) { }

  async save (response: Partial<Response>): Promise<Response> {
    return this.repo.save(this.repo.create(response));
  }

  async findDetailedById (id: string): Promise<Response | null> {
    return this.repo.findOne({
      where: { id },
      relations: {
        answers: {
          question: true,
          selectedOption: true,
          selectedOptions: true,
        },
        survey: {
          questions: true,
        },
      },
    });
  }

  async countBySurvey (surveyId: string): Promise<number> {
    return this.repo.count({ where: { survey: { id: surveyId } } });
  }
}
