import { Module } from '@nestjs/common';
import { SurveysModule } from './modules/surveys/surveys.module';

@Module({
  imports: [SurveysModule],
})
export class AppModule {}
