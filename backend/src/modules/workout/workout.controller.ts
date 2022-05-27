import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';

import { WorkoutDto, UpdateWorkoutDto } from './dtos';
import { WorkoutService } from './workout.service';
import { Workout } from './models';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('workout')
export class WorkoutController {
  constructor(private workoutService: WorkoutService) {}

  @Post()
  async create(@Body() workoutDto: WorkoutDto): Promise<Workout> {
    return this.workoutService.create(workoutDto);
  }

  @Get()
  async findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Workout>> {
    return this.workoutService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Workout> {
    return this.workoutService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWorkoutDto: UpdateWorkoutDto,
  ): Promise<UpdateResult> {
    return this.workoutService.update(id, updateWorkoutDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.workoutService.remove(id);
  }
}
