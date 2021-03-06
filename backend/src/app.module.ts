import { Module } from '@nestjs/common';
import { WorkoutModule } from './modules/workout/workout.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ExerciseModule } from './modules/exercise/exercise.module';
import { SetModule } from './modules/set/set.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    WorkoutModule,
    UserModule,
    ExerciseModule,
    SetModule,
  ],
})
export class AppModule {}
