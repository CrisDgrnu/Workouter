import { BaseEntity } from 'typeorm';
export declare class Workout extends BaseEntity {
    id: number;
    name: string;
    type: string;
    date: Date;
    duration: number;
    score: number;
}
