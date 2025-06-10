import { IsEnum, IsNotEmpty, IsString, IsDate, IsOptional, ValidateNested, Validate } from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionType } from '../enums/question-type.enum';
import { HasMinimumQuestions } from './validators/has-minimum-questions';
import { HasOptionsIfChoiceQuestion } from './validators/has-options-if-choice-question';

export class CreateOptionDto {
  @IsString()
  @IsNotEmpty()
  text: string;
}

export class CreateQuestionDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsEnum(QuestionType)
  type: QuestionType;

  @ValidateNested({ each: true })
  @Type(() => CreateOptionDto)
  options?: CreateOptionDto[];

  @Validate(HasOptionsIfChoiceQuestion)
  validateOptions: boolean;
}

export class CreateSurveyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  @Validate(HasMinimumQuestions)
  questions: CreateQuestionDto[];

  @IsDate()
  @Type(() => Date)
  duration: Date;
}
