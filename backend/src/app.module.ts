import { Module } from '@nestjs/common';
import { WorkoutModule } from './workout/workout.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [WorkoutModule, TypeOrmModule.forRoot({ autoLoadEntities: true })],
})
export class AppModule {}
