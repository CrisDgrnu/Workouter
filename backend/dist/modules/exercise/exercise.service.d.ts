import { PaginateConfig, Paginated, PaginateQuery } from 'nestjs-paginate';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ExerciseDto, UpdateExerciseDto } from './dtos';
import { Exercise } from './models';
export declare class ExerciseService {
    private readonly exerciseRepository;
    pageConfig: PaginateConfig<Exercise>;
    constructor(exerciseRepository: Repository<Exercise>);
    create(exerciseDto: ExerciseDto): Promise<Exercise>;
    findAll(query: PaginateQuery): Promise<Paginated<Exercise>>;
    findOne(id: number): Promise<Exercise>;
    update(id: number, updateExerciseDto: UpdateExerciseDto): Promise<UpdateResult>;
    remove(id: number): Promise<DeleteResult>;
}
