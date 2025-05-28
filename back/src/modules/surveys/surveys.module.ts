import { Module } from '@nestjs/common';
import { SurveysController } from './controllers/surveys/surveys.controller';
import { SurveysService } from './services/surveys/surveys.service';

@Module({
  controllers: [SurveysController],
  providers: [SurveysService],
})
export class SurveysModule {}
