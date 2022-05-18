import { WorkoutDto, UpdateWorkoutDto } from './dto';
import { WorkoutService } from './workout.service';
export declare class WorkoutController {
    private workoutService;
    constructor(workoutService: WorkoutService);
    create(workoutDto: WorkoutDto): Promise<string>;
    findAll(): Promise<import(".prisma/client").Workout[]>;
    findOne(id: number): Promise<import(".prisma/client").Workout>;
    update(id: number, updateWorkoutDto: UpdateWorkoutDto): Promise<string>;
    remove(id: number): Promise<string>;
}
