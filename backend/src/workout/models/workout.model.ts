import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { WorkoutDto } from '../dto';

@Entity()
export class Workout {
  constructor(dto: WorkoutDto) {
    Object.assign(this, dto);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  date: Date;

  @Column()
  duration: number;

  @Column({ nullable: false, type: 'float', default: 0.0 })
  score: number;
}
