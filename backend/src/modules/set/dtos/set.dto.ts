import {
  IsBoolean,
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class SetDto {
  @IsInt()
  @IsNotEmpty()
  cycles: number;

  @IsInt()
  @IsNotEmpty()
  reps: number;

  @IsString()
  @IsNotEmpty()
  exercise: string;

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
