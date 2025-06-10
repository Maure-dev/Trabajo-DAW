import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './question.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Option {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @ManyToOne(() => Question, question => question.options, { onDelete: 'CASCADE' })
  @Exclude()
  question: Question;
}
