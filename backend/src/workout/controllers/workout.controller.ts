import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { WorkoutDto, UpdateWorkoutDto } from './../dto';
import { WorkoutService } from '../services/workout.service';
import { Workout } from '../models';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('workout')
export class WorkoutController {
  constructor(private workoutService: WorkoutService) {}

  @Post()
  async create(@Body() workoutDto: WorkoutDto): Promise<Workout> {
    return this.workoutService.create(workoutDto);
  }

  @Get()
  async findAll(): Promise<Workout[]> {
    return this.workoutService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Workout> {
    return this.workoutService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateWorkoutDto: UpdateWorkoutDto,
  ): Promise<UpdateResult> {
    return this.workoutService.update(id, updateWorkoutDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.workoutService.remove(id);
  }
}
