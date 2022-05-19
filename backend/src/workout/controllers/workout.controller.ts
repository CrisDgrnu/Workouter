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
import { Workout } from './../models';
import { WorkoutService } from './../workout.service';

@Controller('workout')
export class WorkoutController {
  constructor(private workoutService: WorkoutService) {}

  @Post()
  async create(@Body() workoutDto: WorkoutDto) {
    return this.workoutService.create(new Workout(workoutDto));
  }

  @Get()
  async findAll() {
    return this.workoutService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.workoutService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateWorkoutDto: UpdateWorkoutDto,
  ) {
    return this.workoutService.update(id, updateWorkoutDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.workoutService.remove(id);
  }
}
