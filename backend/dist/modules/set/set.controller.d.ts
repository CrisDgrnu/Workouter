import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { DeleteResult, UpdateResult } from 'typeorm';
import { SetDto, UpdateSetDto } from './dtos';
import { Set } from './models';
import { SetService } from './set.service';
export declare class SetController {
    private setService;
    constructor(setService: SetService);
    create(setDto: SetDto): Promise<Set>;
    findAll(query: PaginateQuery): Promise<Paginated<Set>>;
    findOne(id: number): Promise<Set>;
    update(id: number, updatesetDto: UpdateSetDto): Promise<UpdateResult>;
    remove(id: number): Promise<DeleteResult>;
}
