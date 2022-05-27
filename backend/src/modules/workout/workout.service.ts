import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Repository } from 'typeorm';
import {
  FilterOperator,
  PaginateQuery,
  paginate,
  Paginated,
} from 'nestjs-paginate';
import { UpdateWorkoutDto, WorkoutDto } from './dtos';
import { Workout } from './models';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(Workout)
    private readonly workoutRepository: Repository<Workout>,
  ) {}

  create(workoutDto: WorkoutDto): Promise<Workout> {
    const createdWorkout = this.workoutRepository.create(workoutDto);
    return this.workoutRepository.save(createdWorkout);
  }

  findAll(query: PaginateQuery): Promise<Paginated<Workout>> {
    return paginate(query, this.workoutRepository, {
      sortableColumns: ['id', 'name', 'type', 'date', 'duration', 'score'],
      searchableColumns: ['id', 'name', 'type', 'date', 'duration', 'score'],
      defaultSortBy: [['id', 'DESC']],
      filterableColumns: {
        score: [FilterOperator.GTE, FilterOperator.LTE],
      },
    });
  }

  async findOne(id: number): Promise<Workout> {
    const workout: Workout = await this.workoutRepository.findOne(id);

    if (!workout)
      throw new NotFoundException({
        statusCode: 404,
        message: [`the workout with id ${id} has not been found`],
        error: 'Not found',
      });

    return workout;
  }

  update(
    id: number,
    updateWorkoutDto: UpdateWorkoutDto,
  ): Promise<UpdateResult> {
    return this.workoutRepository.update(id, updateWorkoutDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.workoutRepository.delete(id);
  }
}
