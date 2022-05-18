import { UpdateWorkoutDto, WorkoutDto } from './dto';
import { Workout } from './interface';
export declare class WorkoutService {
    create(workoutDto: WorkoutDto): string;
    findAll(): Workout[];
    findOne(id: string): Workout;
    update(id: string, updateWorkoutDto: UpdateWorkoutDto): string;
    remove(id: string): string;
}
