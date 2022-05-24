import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Workout } from '../interfaces';
import { environment } from '../../../../environments/environment';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Page } from 'src/app/shared/interfaces/page.interface';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private API_URL: string = environment.API_URL;

  private workoutUrl: string = 'workout';

  private limitParam: string = '?limit=';

  private pageParam: string = '?page=';

  constructor(private http: HttpClient) {}

  /**
   *
   * Fetch all the workouts from the API.
   *
   * @returns an observable with a list of workouts
   */
  getWorkouts(limit: number, page: number): Observable<Workout[]> {
    const url = this.API_URL + this.workoutUrl;

    return this.http.get<Page<Workout>>(url, { params: { limit, page } }).pipe(
      map((res) => {
        return res.data;
      }),
      catchError(this.handleError<Workout[]>('getWorkouts', []))
    );
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
