import { IsString, IsInt, IsDecimal } from 'class-validator';

export class WorkoutDto {
  @IsString()
  name: string;

  @IsString()
  type: string;
  date: Date;

  @IsInt()
  duration: number;

  @IsDecimal()
  score: number;
}
