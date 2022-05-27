import { BaseEntity } from 'typeorm';
export declare class Exercise extends BaseEntity {
    id: number;
    name: string;
    muscles: string[];
    score: number;
}
