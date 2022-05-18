import { Injectable } from '@nestjs/common';
import { UpdateWorkoutDto, WorkoutDto } from './dto';
import { Workout } from '@prisma/client';
@Injectable()
export class WorkoutService {
  create(workoutDto: WorkoutDto) {
    return `This methods creates a workouts based on the DTO ${workoutDto}`;
  }

  findAll(): Workout[] {
    return [];
  }

  findOne(id: number): Workout {
    return {
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
      name: 'Cristian',
      duration: null,
      score: null,
    };
  }

  update(id: number, updateWorkoutDto: UpdateWorkoutDto) {
    return `This method update a workout based on the id ${id} and put the information ${updateWorkoutDto}`;
  }

  remove(id: number) {
    return `This method removes a workout based on the id ${id}`;
  }
}
