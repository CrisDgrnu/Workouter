import { Component, OnInit } from '@angular/core';
import { AutoCharImage } from 'src/app/shared/components/auto-char-image/interfaces';

@Component({
  selector: 'app-exercise-overview',
  templateUrl: './exercise-overview.component.html',
  styleUrls: ['./exercise-overview.component.scss'],
})
export class ExerciseOverviewComponent implements OnInit {
  exerciseName: string = 'Push-Up';
  constructor() {}

  ngOnInit(): void {}
}
