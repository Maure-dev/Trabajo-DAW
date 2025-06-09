import { Exclude, Expose, Type } from 'class-transformer';
import { OptionPublicDto } from './option-public.dto';


export class QuestionPublicDto {
  @Expose()
  text: string;

  @Expose()
  type: string;

  @Expose()
  @Type(() => OptionPublicDto)
  options: OptionPublicDto[];

  @Exclude()
  id: string;
}
