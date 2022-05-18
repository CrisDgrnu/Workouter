import { Connection, UpdateResult } from 'typeorm';
import { Repository } from 'typeorm';
import { UpdateWorkoutDto, WorkoutDto } from './dto';
import { Workout } from './models';
export declare class WorkoutService {
    private workoutRepository;
    private connection;
    constructor(workoutRepository: Repository<Workout>, connection: Connection);
    create(workoutDto: WorkoutDto): Promise<WorkoutDto>;
    findAll(): Promise<Workout[]>;
    findOne(id: number): Promise<Workout>;
    update(id: number, updateWorkoutDto: UpdateWorkoutDto): Promise<UpdateResult>;
    remove(id: number): Promise<void>;
}
