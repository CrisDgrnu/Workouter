import { Workout } from '../../modules/workout/interfaces';

export interface Page<T> {
  data: T[];
  meta: object;
  links: object;
}
