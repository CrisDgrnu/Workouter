import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterOperator,
  paginate,
  PaginateConfig,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { GenericHttpError } from '../../errors/genericHttp.error';

import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ExerciseDto, UpdateExerciseDto } from './dtos';
import { Exercise } from './models';

@Injectable()
export class ExerciseService {
  pageConfig: PaginateConfig<Exercise> = {
    sortableColumns: ['id', 'muscles', 'score'],
    searchableColumns: ['id', 'muscles', 'score'],
    defaultSortBy: [['id', 'DESC']],
    filterableColumns: {
      score: [FilterOperator.GTE, FilterOperator.LTE],
    },
  };

  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
  ) {}

  async create(exerciseDto: ExerciseDto): Promise<Exercise> {
    const createdExercise = this.exerciseRepository.create(exerciseDto);
    try {
      return await this.exerciseRepository.save(createdExercise);
    } catch (error) {
      throw new ConflictException(
        new GenericHttpError(409, ['duplicated name for exercise'], 'Conflict'),
      );
    }
  }

  findAll(query: PaginateQuery): Promise<Paginated<Exercise>> {
    return paginate(query, this.exerciseRepository, this.pageConfig);
  }

  async findOne(id: number): Promise<Exercise> {
    const exercise = await this.exerciseRepository.findOne(id);

    if (!exercise)
      throw new NotFoundException(
        new GenericHttpError(
          404,
          [`the exercise with id ${id} has not been found`],
          'Not Found',
        ),
      );

    return exercise;
  }

  async update(
    id: number,
    updateExerciseDto: UpdateExerciseDto,
  ): Promise<UpdateResult> {
    try {
      return await this.exerciseRepository.update(id, updateExerciseDto);
    } catch (error) {
      throw new ConflictException(
        new GenericHttpError(409, ['duplicated name for exercise'], 'Conflict'),
      );
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    try {
      return await this.exerciseRepository.delete(id);
    } catch (error) {
      throw new BadRequestException(
        new GenericHttpError(
          400,
          [`exercise with id ${id} is implied in some sets`],
          'Bad Request',
        ),
      );
    }
  }
}
