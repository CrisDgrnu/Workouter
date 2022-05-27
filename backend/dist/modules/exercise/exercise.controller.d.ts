import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ExerciseDto, UpdateExerciseDto } from './dtos';
import { ExerciseService } from './exercise.service';
import { Exercise } from './models';
export declare class ExerciseController {
    private exerciseService;
    constructor(exerciseService: ExerciseService);
    create(exerciseDto: ExerciseDto): Promise<Exercise>;
    findAll(query: PaginateQuery): Promise<Paginated<Exercise>>;
    findOne(id: number): Promise<Exercise>;
    update(id: number, updateExerciseDto: UpdateExerciseDto): Promise<UpdateResult>;
    remove(id: number): Promise<DeleteResult>;
}
