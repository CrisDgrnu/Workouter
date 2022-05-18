import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { WorkoutDto, UpdateWorkoutDto } from './dto';
import { WorkoutService } from './workout.service';

@Controller('workout')
export class WorkoutController {
  constructor(private workoutService: WorkoutService) {}

  @Post()
  async create(@Body() workoutDto: WorkoutDto) {
    return this.workoutService.create(workoutDto);
  }

  @Get()
  async findAll() {
    return this.workoutService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.workoutService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWorkoutDto: UpdateWorkoutDto,
  ) {
    return this.workoutService.update(id, updateWorkoutDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.workoutService.remove(id);
  }
}
