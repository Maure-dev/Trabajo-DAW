import { IsEnum } from 'class-validator';
import { SurveyStatus } from '../enums/survey-status.enum';

export class GetSurveysQueryDto {
  @IsEnum(SurveyStatus, { message: 'status must be DRAFT, PUBLISHED or CLOSED' })
  status: SurveyStatus;
}
