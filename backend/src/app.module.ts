import { Module } from '@nestjs/common';
import { WorkoutModule } from './workout/workout.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    WorkoutModule,
    TypeOrmModule.forRoot({ autoLoadEntities: true }),
    UserModule,
  ],
})
export class AppModule {}
