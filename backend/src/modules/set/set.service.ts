import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { SetDto, UpdateSetDto } from './dtos';
import { Set } from './models';

@Injectable()
export class SetService {
  constructor(
    @InjectRepository(Set) private readonly setRepository: Repository<Set>,
  ) {}

  create(setDto: SetDto): Promise<Set> {
    const createdSet = this.setRepository.create(setDto);
    return this.setRepository.save(createdSet);
  }

  findAll(query: PaginateQuery): Promise<Paginated<Set>> {
    return paginate(query, this.setRepository, {
      sortableColumns: [
        'id',
        'cycles',
        'reps',
        'cycleBreak',
        'exerciseBreak',
        'completed',
        'score',
      ],
      searchableColumns: [
        'id',
        'cycles',
        'reps',
        'cycleBreak',
        'exerciseBreak',
        'completed',
        'score',
      ],
      defaultSortBy: [['id', 'DESC']],
      filterableColumns: {
        score: [FilterOperator.GTE, FilterOperator.LTE],
      },
    });
  }

  async findOne(id: number): Promise<Set> {
    const set: Set = await this.setRepository.findOne(id);

    if (!set)
      throw new NotFoundException({
        statusCode: 404,
        message: [`the set with id ${id} has not been found`],
        error: 'Not Found',
      });

    return set;
  }

  update(id: number, updateSetDto: UpdateSetDto): Promise<UpdateResult> {
    return this.setRepository.update(id, updateSetDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.setRepository.delete(id);
  }
}
