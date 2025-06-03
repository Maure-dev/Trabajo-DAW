import { Exclude, Expose, Type } from 'class-transformer';
import { QuestionResponseDto } from './survey-response.dto'

@Exclude()
export class SurveyPublicDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  status: string;

  @Expose()
  @Type(() => QuestionResponseDto)
  questions: QuestionResponseDto[];
}
