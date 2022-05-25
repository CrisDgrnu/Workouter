import { DeleteResult, UpdateResult } from 'typeorm';
import { Repository } from 'typeorm';
import { PaginateQuery, Paginated } from 'nestjs-paginate';
import { UpdateWorkoutDto, WorkoutDto } from '../dtos';
import { Workout } from '../models';
export declare class WorkoutService {
    private readonly workoutRepository;
    constructor(workoutRepository: Repository<Workout>);
    create(workoutDto: WorkoutDto): Promise<Workout>;
    findAll(query: PaginateQuery): Promise<Paginated<Workout>>;
    findOne(id: number): Promise<Workout>;
    update(id: number, updateWorkoutDto: UpdateWorkoutDto): Promise<UpdateResult>;
    remove(id: number): Promise<DeleteResult>;
}
