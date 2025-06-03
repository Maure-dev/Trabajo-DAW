import {
  IsUUID,
  IsOptional,
  IsString,
  IsArray,
  ValidateIf,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateAnswerDto {
  @IsUUID()
  questionId: string;

  @ValidateIf((o: CreateAnswerDto) => !o.selectedOptionId && !o.selectedOptionIds)
  @IsString()
  @IsOptional()
  text?: string;

  @ValidateIf((o: CreateAnswerDto) => !o.text && !o.selectedOptionIds)
  @IsUUID()
  @IsOptional()
  selectedOptionId?: string;

  @ValidateIf((o: CreateAnswerDto) => !o.text && !o.selectedOptionId)
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  @IsOptional()
  selectedOptionIds?: string[];
}
