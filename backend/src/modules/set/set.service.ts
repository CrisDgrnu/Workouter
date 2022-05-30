import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterOperator,
  paginate,
  PaginateConfig,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ExerciseDto, UpdateExerciseDto } from '../exercise/dtos';
import { Exercise } from '../exercise/models';
import { SetDto, UpdateSetDto } from './dtos';
import { Set } from './models';

@Injectable()
export class SetService {
  pageConfig: PaginateConfig<Set> = {
    relations: ['exercise'],
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
  };

  constructor(
    @InjectRepository(Set)
    private readonly setRepository: Repository<Set>,

    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
  ) {}

  async create(setDto: SetDto): Promise<Set> {
    const { exerciseDto, exerciseId } = setDto;

    const exercise = await this.getExercise(exerciseDto, exerciseId);
    const set = { exercise, ...this.setRepository.create(setDto) } as Set;

    return this.setRepository.save(set);
  }

  findAll(query: PaginateQuery): Promise<Paginated<Set>> {
    return paginate(query, this.setRepository, this.pageConfig);
  }

  async findOne(id: number): Promise<Set> {
    const set: Set = await this.setRepository.findOne(id, {
      relations: ['exercise'],
    });

    if (!set)
      throw new NotFoundException({
        statusCode: 404,
        message: [`the set with id ${id} has not been found`],
        error: 'Not Found',
      });

    return set;
  }

  async update(id: number, updateSetDto: UpdateSetDto): Promise<UpdateResult> {
    const exercise = await this.getExercise(updateSetDto.exerciseDto);
    const set = { exercise, ...this.setRepository.create(updateSetDto) } as Set;
    return this.setRepository.update(id, set);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.setRepository.delete(id);
  }

  /**
   * Creates and save an exercise if not exists, othewhise, find it and return it
   * @param exerciseDto - The exercise with the data to be created
   * @returns - An exercise based on his name
   */
  private async getExercise(
    exerciseDto: ExerciseDto | UpdateExerciseDto,
    exerciseId?: number,
  ) {
    if (exerciseId)
      return await this.exerciseRepository.findOne({ id: exerciseId });

    let exercise = await this.exerciseRepository.findOne({
      name: exerciseDto.name,
    });

    if (!exercise) {
      exercise = await this.exerciseRepository.create(exerciseDto);
      return await this.exerciseRepository.save(exercise);
    }

    return exercise;
  }
}
