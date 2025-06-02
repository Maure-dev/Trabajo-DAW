import { Expose, Type } from 'class-transformer';
import { QuestionType } from "../enums/question-type.enum";

export class OptionResponseDto {
  @Expose()
  id: string;

  @Expose()
  text: string;
}

export class QuestionResponseDto {
  @Expose()
  id: string;

  @Expose()
  text: string;

  @Expose()
  type: QuestionType;

  @Expose()
  @Type(() => OptionResponseDto)
  options?: OptionResponseDto[];
}

export class SurveyResponseDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  @Type(() => QuestionResponseDto)
  questions: QuestionResponseDto[];
}
