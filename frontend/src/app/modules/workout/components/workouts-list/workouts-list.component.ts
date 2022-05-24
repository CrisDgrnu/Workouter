import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/shared/interfaces/page.interface';
import { Workout } from '../../interfaces';
import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'app-workouts-list',
  templateUrl: './workouts-list.component.html',
  styleUrls: ['./workouts-list.component.scss'],
})
export class WorkoutsListComponent implements OnInit {
  panelOpenState: boolean = false;

  limit: number = 10;

  page: number = 0;

  workouts: Workout[] = [];

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.getWorkouts();
    console.log(this.workouts);
  }

  getWorkouts() {
    this.workoutService
      .getWorkouts(this.limit, this.page)
      .subscribe(
        (newWorkouts: Workout[]) =>
          (this.workouts = this.workouts.concat(newWorkouts))
      );
  }

  onScrollDown() {
    this.page++;
    this.workoutService
      .getWorkouts(this.limit, this.page)
      .subscribe(
        (newWorkouts: Workout[]) =>
          (this.workouts = this.workouts.concat(newWorkouts))
      );
  }
}
