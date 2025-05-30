import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveysController } from './controllers/surveys.controller';
import { HealthController } from './controllers/health.controller';
import { SurveysService } from './services/surveys.service';
import { SurveysRepository } from './repositories/surveys.repository';
import { Survey } from './entities/survey.entity';
import { Question } from './entities/question.entity';
import { Option } from './entities/option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Survey, Question, Option])],
  controllers: [SurveysController, HealthController],
  providers: [SurveysService, SurveysRepository],
})
export class SurveysModule {}
