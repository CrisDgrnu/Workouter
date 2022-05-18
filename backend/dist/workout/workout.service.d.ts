import { UpdateWorkoutDto, WorkoutDto } from './dto';
import { Workout } from '@prisma/client';
export declare class WorkoutService {
    create(workoutDto: WorkoutDto): string;
    findAll(): Workout[];
    findOne(id: number): Workout;
    update(id: number, updateWorkoutDto: UpdateWorkoutDto): string;
    remove(id: number): string;
}
