import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Repository } from 'typeorm';

import { UpdateWorkoutDto, WorkoutDto } from '../dto';
import { Workout } from '../models';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(Workout) private workoutRepository: Repository<Workout>,
  ) {}

  create(workoutDto: WorkoutDto): Promise<Workout> {
    const createdWorkout = this.workoutRepository.create(workoutDto);
    return this.workoutRepository.save(createdWorkout);
  }

  findAll(): Promise<Workout[]> {
    return this.workoutRepository.find();
  }

  findOne(id: number): Promise<Workout> {
    return this.workoutRepository.findOne(id);
  }

  update(
    id: number,
    updateWorkoutDto: UpdateWorkoutDto,
  ): Promise<UpdateResult> {
    return this.workoutRepository.update(id, updateWorkoutDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.workoutRepository.delete(id);
  }
}
