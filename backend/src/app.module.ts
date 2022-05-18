import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkoutModule } from './workout/workout.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [WorkoutModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
