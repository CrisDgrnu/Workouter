import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from '../exercise/models';
import { Set } from './models';
import { SetController } from './set.controller';
import { SetService } from './set.service';

@Module({
  imports: [TypeOrmModule.forFeature([Set, Exercise])],
  controllers: [SetController],
  providers: [SetService],
})
export class SetModule {}
