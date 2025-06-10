import { Exclude, Expose } from 'class-transformer';

export class OptionPublicDto {
  @Expose()
  text: string;

  @Exclude()
  id: string;
}
