import { IsString, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionType } from '../enums/question-type.enum';

export class OptionDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  text: string;
}

export class UpdateQuestionDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  text: string;

  @IsString()
  type: QuestionType;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  options?: OptionDto[];
}

export class UpdateSurveyDto {
  @IsString()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateQuestionDto)
  questions: UpdateQuestionDto[];
}
