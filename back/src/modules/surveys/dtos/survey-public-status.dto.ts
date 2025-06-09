import { Exclude, Expose, Type } from 'class-transformer';
import { QuestionPublicDto } from './question-public.dto';

export class SurveyPublicStatusDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose({ name: 'expiresAt' })
  expiresAt: Date;

  @Expose()
  status: string;

  @Expose()
  @Type(() => QuestionPublicDto)
  questions: QuestionPublicDto[];
}
