import { IsArray, IsDecimal, IsNotEmpty, IsString } from 'class-validator';

export class ExerciseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString({ each: true })
  @IsArray()
  @IsNotEmpty()
  muscles: string[];

  @IsDecimal()
  @IsNotEmpty()
  score: number;
}
