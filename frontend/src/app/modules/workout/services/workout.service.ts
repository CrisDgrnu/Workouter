import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Workout } from '../interfaces';
import { environment } from '../../../../environments/environment';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private API_URL: string = environment.API_URL;
  private workoutUrl: string = 'workout';

  constructor(private http: HttpClient) {}

  /**
   *
   * Fetch all the workouts from the API.
   *
   * @returns an observable with a list of workouts
   */
  getWorkouts(): Observable<Workout[]> {
    return this.http
      .get<Workout[]>(this.API_URL + this.workoutUrl)
      .pipe(catchError(this.handleError<Workout[]>('getWorkouts', [])));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error);

      // TODO: better job of transforming error for user consumption

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
