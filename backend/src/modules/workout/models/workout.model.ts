import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Workout extends BaseEntity {
  @PrimaryGeneratedColumn({
    comment: 'The workout unique identifier',
    type: 'int',
  })
  id: number;

  @Column({
    comment: 'The workout name',
    type: 'varchar',
  })
  name: string;

  @Column({
    comment: 'The workout type, ie: Calisthenics, Gym, Crossfit',
    type: 'varchar',
  })
  type: string;

  @Column({
    comment: 'The workout date when it has been done',
    type: 'date',
  })
  date: Date;

  @Column({
    comment: 'The workout duration in minutes',
    type: 'int',
  })
  duration: number;

  @Column({
    comment: 'The workout score that the user gives',
    type: 'float',
    default: 0.0,
  })
  score: number;
}
