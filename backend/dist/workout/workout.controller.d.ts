import { WorkoutDto, UpdateWorkoutDto } from './dto';
import { Workout } from './models';
import { WorkoutService } from './workout.service';
export declare class WorkoutController {
    private workoutService;
    constructor(workoutService: WorkoutService);
    create(workoutDto: WorkoutDto): Promise<WorkoutDto>;
    findAll(): Promise<Workout[]>;
    findOne(id: number): Promise<Workout>;
    update(id: number, updateWorkoutDto: UpdateWorkoutDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<void>;
}
