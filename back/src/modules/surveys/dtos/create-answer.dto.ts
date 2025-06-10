import {
  IsString,
  IsEmail,
  IsArray,
  IsNotEmpty,
  ArrayNotEmpty,
  ValidateNested,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AnswerInputDto {
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString({ each: true })
  answer: string | string[];
}

export class SubmitSurveyAnswersDto {
  @IsString()
  title: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AnswerInputDto)
  questions: AnswerInputDto[];
}
