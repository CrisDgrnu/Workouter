import { PaginateConfig, Paginated, PaginateQuery } from 'nestjs-paginate';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Exercise } from '../exercise/models';
import { SetDto, UpdateSetDto } from './dtos';
import { Set } from './models';
export declare class SetService {
    private readonly setRepository;
    private readonly exerciseRepository;
    pageConfig: PaginateConfig<Set>;
    constructor(setRepository: Repository<Set>, exerciseRepository: Repository<Exercise>);
    create(setDto: SetDto): Promise<Set>;
    findAll(query: PaginateQuery): Promise<Paginated<Set>>;
    findOne(id: number): Promise<Set>;
    update(id: number, updateSetDto: UpdateSetDto): Promise<UpdateResult>;
    remove(id: number): Promise<DeleteResult>;
    private getExercise;
}
