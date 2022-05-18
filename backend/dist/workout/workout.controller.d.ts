import { WorkoutDto, UpdateWorkoutDto } from './dto';
import { WorkoutService } from './workout.service';
export declare class WorkoutController {
    private workoutService;
    constructor(workoutService: WorkoutService);
    create(workoutDto: WorkoutDto): Promise<string>;
    findAll(): Promise<import("./interface").Workout[]>;
    findOne(id: string): Promise<import("./interface").Workout>;
    update(id: string, updateWorkoutDto: UpdateWorkoutDto): Promise<string>;
    remove(id: string): Promise<string>;
}
