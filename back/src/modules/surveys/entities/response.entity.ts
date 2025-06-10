import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Survey } from './survey.entity';
import { Answer } from './answer.entity';

@Entity()
export class Response {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Survey, { onDelete: 'CASCADE' })
  survey: Survey;

  @OneToMany(() => Answer, (answer) => answer.response, { cascade: true })
  answers: Answer[];

  @CreateDateColumn()
  createdAt: Date;
}
