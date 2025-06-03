import { Expose } from 'class-transformer';

export class SurveyStatusDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  status: string;

  @Expose()
  linkParticipation: string;

  @Expose()
  linkResults: string;
}
