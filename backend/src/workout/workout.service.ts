import { Injectable } from '@nestjs/common';
import { UpdateWorkoutDto, WorkoutDto } from './dto';
import { Workout } from './interface';

@Injectable()
export class WorkoutService {
  create(workoutDto: WorkoutDto) {
    return `This methods creates a workouts based on the DTO ${workoutDto}`;
  }

  findAll(): Workout[] {
    return [];
  }

  findOne(id: string): Workout {
    return { name: `Workout ${id}` };
  }

  update(id: string, updateWorkoutDto: UpdateWorkoutDto) {
    return `This method update a workout based on the id ${id} and put the information ${updateWorkoutDto}`;
  }

  remove(id: string) {
    return `This method removes a workout based on the id ${id}`;
  }
}
