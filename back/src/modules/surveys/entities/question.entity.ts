import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Survey } from './survey.entity';
import { Option } from './option.entity';
import { QuestionType } from '../enums/question-type.enum';

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
  survey: Survey;

  @OneToMany(() => Option, (o) => o.question, { cascade: true, eager: true })
  options: Option[];
}
