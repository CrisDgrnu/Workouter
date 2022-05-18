import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { WorkoutDto } from '../dto';
import { Workout } from '../models';
export declare class WorkoutPipe implements PipeTransform<WorkoutDto, Workout> {
    transform(value: any, metadata: ArgumentMetadata): any;
}
