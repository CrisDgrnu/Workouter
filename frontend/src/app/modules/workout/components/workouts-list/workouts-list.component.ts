import { Component, OnInit } from '@angular/core';
import { Workout } from '../../interfaces';
import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'app-workouts-list',
  templateUrl: './workouts-list.component.html',
  styleUrls: ['./workouts-list.component.scss'],
})
export class WorkoutsListComponent implements OnInit {
  panelOpenState = false;

  workouts: Workout[] = [];

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.workoutService
      .getWorkouts()
      .subscribe((workouts) => (this.workouts = workouts));
  }

  getWorkouts() {}
}
