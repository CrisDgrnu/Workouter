import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ExerciseDto } from '../../exercise/dtos/';

export class SetDto {
  @IsInt()
  @IsNotEmpty()
  cycles: number;

  @IsInt()
  @IsNotEmpty()
  reps: number;

  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => ExerciseDto)
  exerciseDto: ExerciseDto;

  @IsInt()
  @IsOptional()
  exerciseId: number;

  @IsInt()
  @IsNotEmpty()
  cycleBreak: number;

  @IsInt()
  @IsNotEmpty()
  exerciseBreak: number;

  @IsBoolean()
  @IsNotEmpty()
  completed: boolean;

  @IsDecimal()
  @IsNotEmpty()
  score: number;
}
