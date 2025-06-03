import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Question } from './question.entity';
import { Option } from './option.entity';
import { Response } from './response.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Question, (question) => question.answers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @Column({ type: 'text', nullable: true })
  text?: string;

  @ManyToOne(() => Option, { nullable: true })
  @JoinColumn({ name: 'selected_option_id' })
  selectedOption?: Option;

  @ManyToMany(() => Option)
  @JoinTable({
    name: 'answer_selected_options',
    joinColumn: { name: 'answer_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'option_id', referencedColumnName: 'id' },
  })
  selectedOptions?: Option[];

  @ManyToOne(() => Response, (response) => response.answers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'response_id' })
  response: Response;
}
