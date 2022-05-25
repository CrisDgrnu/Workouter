import { Module } from '@nestjs/common';
import { WorkoutModule } from './modules/workout/workout.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), WorkoutModule, UserModule],
})
export class AppModule {}
