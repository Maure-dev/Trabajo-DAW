import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Survey } from './survey.entity';
import { Option } from './option.entity';
import { QuestionType } from '../enums/question-type.enum';
import { Exclude } from 'class-transformer';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @Column({
    type: 'enum',
    enum: QuestionType,
  })
  type: QuestionType;

  @ManyToOne(() => Survey, (s) => s.questions)
  @Exclude()
  survey: Survey;

  @OneToMany(() => Option, (o) => o.question, { cascade: true, eager: true })
  options: Option[];
}
