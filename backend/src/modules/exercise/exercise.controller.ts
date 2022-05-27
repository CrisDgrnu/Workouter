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
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ExerciseDto, UpdateExerciseDto } from './dtos';
import { ExerciseService } from './exercise.service';
import { Exercise } from './models';

@Controller('exercise')
export class ExerciseController {
  constructor(private exerciseService: ExerciseService) {}

  @Post()
  async create(@Body() exerciseDto: ExerciseDto): Promise<Exercise> {
    return this.exerciseService.create(exerciseDto);
  }

  @Get()
  async findAll(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<Exercise>> {
    return this.exerciseService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Exercise> {
    return this.exerciseService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExerciseDto: UpdateExerciseDto,
  ): Promise<UpdateResult> {
    return this.exerciseService.update(id, updateExerciseDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.exerciseService.remove(id);
  }
}
