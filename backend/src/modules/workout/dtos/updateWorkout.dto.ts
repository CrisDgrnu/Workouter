import {
  IsString,
  IsInt,
  IsDecimal,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class UpdateWorkoutDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsDateString()
  date: Date;

  @IsOptional()
  @IsInt()
  duration: number;

  @IsOptional()
  @IsDecimal()
  score: number;
}
