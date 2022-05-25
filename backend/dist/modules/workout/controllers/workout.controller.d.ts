import { PaginateQuery, Paginated } from 'nestjs-paginate';
import { WorkoutDto, UpdateWorkoutDto } from '../dtos';
import { WorkoutService } from '../services/workout.service';
import { Workout } from '../models';
import { DeleteResult, UpdateResult } from 'typeorm';
export declare class WorkoutController {
    private workoutService;
    constructor(workoutService: WorkoutService);
    create(workoutDto: WorkoutDto): Promise<Workout>;
    findAll(query: PaginateQuery): Promise<Paginated<Workout>>;
    findOne(id: number): Promise<Workout>;
    update(id: number, updateWorkoutDto: UpdateWorkoutDto): Promise<UpdateResult>;
    remove(id: number): Promise<DeleteResult>;
}
