import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exercise } from '../../exercise/models/exercise.model';

@Entity()
export class Set extends BaseEntity {
  @PrimaryGeneratedColumn({
    comment: 'The set unique identifier',
    type: 'int',
  })
  id: number;

  @Column({
    comment: 'The number of cycles of the set',
    type: 'int',
  })
  cycles: number;

  @Column({
    comment: 'The number of repetitions of each cycle',
    type: 'int',
  })
  reps: number;

  @ManyToOne(() => Exercise, { cascade: true, eager: true })
  @JoinColumn({ referencedColumnName: 'name' })
  exercise: Exercise;

  @Column({
    comment: 'The break of the cycle in seconds',
    type: 'int',
  })
  cycleBreak: number;

  @Column({
    comment: 'The break for each exercise in seconds',
    type: 'int',
  })
  exerciseBreak: number;

  @Column({
    comment: 'The set has been completed or not',
    type: 'boolean',
  })
  completed: boolean;

  @Column({
    comment: 'The set score that the user gives',
    type: 'float',
    default: 0.0,
  })
  score: number;
}
