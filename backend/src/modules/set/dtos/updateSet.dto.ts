import {
  IsBoolean,
  IsDecimal,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateSetDto {
  @IsInt()
  @IsOptional()
  cycles: number;

  @IsInt()
  @IsOptional()
  reps: number;

  @IsString()
  @IsOptional()
  exercise: string;

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
