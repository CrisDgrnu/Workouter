import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { GenericHttpError } from '../../errors/genericHttp.error';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ExerciseDto, UpdateExerciseDto } from './dtos';
import { Exercise } from './models';

@Injectable()
export class ExerciseService {
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
    return paginate(query, this.exerciseRepository, {
      sortableColumns: ['id', 'muscles', 'score'],
      searchableColumns: ['id', 'muscles', 'score'],
      defaultSortBy: [['id', 'DESC']],
      filterableColumns: {
        score: [FilterOperator.GTE, FilterOperator.LTE],
      },
    });
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

  update(
    id: number,
    updateExerciseDto: UpdateExerciseDto,
  ): Promise<UpdateResult> {
    return this.exerciseRepository.update(id, updateExerciseDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.exerciseRepository.delete(id);
  }
}
