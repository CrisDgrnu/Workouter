import { BaseEntity } from 'typeorm';
export declare class Set extends BaseEntity {
    id: number;
    cycles: number;
    reps: number;
    exercise: string;
    cycleBreak: number;
    exerciseBreak: number;
    completed: boolean;
    score: number;
}
