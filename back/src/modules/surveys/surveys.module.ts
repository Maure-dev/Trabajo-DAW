import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveysController } from './controllers/surveys.controller';
import { HealthController } from './controllers/health.controller';
import { AnswersController } from './controllers/answers.controller';
import { SurveysService } from './services/surveys.service';
import { AnswersService } from './services/answers.service';
import { SurveysRepository } from './repositories/surveys.repository';
import { AnswersRepository } from './repositories/answers.repository';
import { ResponsesRepository } from './repositories/responses.repository';
import { Survey } from './entities/survey.entity';
import { Question } from './entities/question.entity';
import { Option } from './entities/option.entity';
import { Answer } from './entities/answer.entity';
import { Response } from './entities/response.entity';
import { EmailService } from './services/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([Survey, Question, Option, Answer, Response])],
  controllers: [
    SurveysController,
    AnswersController,
    HealthController
  ],
  providers: [
    SurveysService,
    AnswersService,
    EmailService,
    SurveysRepository,
    AnswersRepository,
    ResponsesRepository,
  ],
})
export class SurveysModule {}
