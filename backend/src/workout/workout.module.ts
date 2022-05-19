import { Module } from '@nestjs/common';
import { Workout } from './models';
import { WorkoutController } from './controllers/workout.controller';
import { WorkoutService } from './workout.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Workout])],
  controllers: [WorkoutController],
  providers: [WorkoutService],
})
export class WorkoutModule {}
