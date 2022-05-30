import { ExerciseDto } from '../../exercise/dtos';
export declare class UpdateSetDto {
    cycles: number;
    reps: number;
    exerciseDto: ExerciseDto;
    cycleBreak: number;
    exerciseBreak: number;
    completed: boolean;
    score: number;
}
