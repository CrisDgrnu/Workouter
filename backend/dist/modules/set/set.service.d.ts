import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { SetDto, UpdateSetDto } from './dtos';
import { Set } from './models';
export declare class SetService {
    private readonly setRepository;
    constructor(setRepository: Repository<Set>);
    create(setDto: SetDto): Promise<Set>;
    findAll(query: PaginateQuery): Promise<Paginated<Set>>;
    findOne(id: number): Promise<Set>;
    update(id: number, updateSetDto: UpdateSetDto): Promise<UpdateResult>;
    remove(id: number): Promise<DeleteResult>;
}
