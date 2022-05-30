import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDecimal,
  IsInt,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ExerciseDto } from '../../exercise/dtos';

export class UpdateSetDto {
  @IsInt()
  @IsOptional()
  cycles: number;

  @IsInt()
  @IsOptional()
  reps: number;

  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => ExerciseDto)
  exerciseDto: ExerciseDto;

  @IsInt()
  @IsOptional()
  cycleBreak: number;

  @IsInt()
  @IsOptional()
  exerciseBreak: number;

  @IsBoolean()
  @IsOptional()
  completed: boolean;

  @IsDecimal()
  @IsOptional()
  score: number;
}
