import {
  IsString,
  IsInt,
  IsDecimal,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';

export class WorkoutDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsInt()
  @IsNotEmpty()
  duration: number;

  @IsDecimal()
  @IsNotEmpty()
  score: number;
}
