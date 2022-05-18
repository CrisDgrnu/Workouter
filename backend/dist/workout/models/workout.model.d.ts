import { WorkoutDto } from '../dto';
export declare class Workout {
    constructor(dto: WorkoutDto);
    id: number;
    name: string;
    type: string;
    date: Date;
    duration: number;
    score: number;
}
