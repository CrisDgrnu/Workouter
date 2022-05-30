import { BaseEntity } from 'typeorm';
import { Exercise } from '../../exercise/models/exercise.model';
export declare class Set extends BaseEntity {
    id: number;
    cycles: number;
    reps: number;
    exercise: Exercise;
    cycleBreak: number;
    exerciseBreak: number;
    completed: boolean;
    score: number;
}
