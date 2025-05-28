import { Module } from '@nestjs/common';
import { SurveysController } from './controllers/surveys.controller';
import { HealthController } from './controllers/health.controller';
import { SurveysService } from './services/surveys.service';
import { SurveysRepository } from './repositories/surveys.repository';

@Module({
  controllers: [SurveysController, HealthController],
  providers: [SurveysService, SurveysRepository],
})
export class SurveysModule {}
