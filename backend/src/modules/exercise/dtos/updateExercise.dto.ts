import { IsArray, IsDecimal, IsOptional, IsString } from 'class-validator';

export class UpdateExerciseDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  muscles: string[];

  @IsDecimal()
  @IsOptional()
  score: number;
}
