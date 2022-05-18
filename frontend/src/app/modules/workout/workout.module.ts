import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutRoutingModule } from './workout-routing.module';
import { WorkoutsListComponent } from './components/workouts-list/workouts-list.component';

// Angular material
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [WorkoutsListComponent],
  imports: [
    CommonModule,
    WorkoutRoutingModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
  ],
})
export class WorkoutModule {}
