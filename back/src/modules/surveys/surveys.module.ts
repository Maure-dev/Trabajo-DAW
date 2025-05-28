import { Module } from '@nestjs/common';
import { SurveysController } from './controllers/surveys.controller';
import { HealthController } from './controllers/health.controller';
import { SurveysService } from './services/surveys/surveys.service';

@Module({
  controllers: [SurveysController, HealthController],
  providers: [SurveysService],
})
export class SurveysModule {}
