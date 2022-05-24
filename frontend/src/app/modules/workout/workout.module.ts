import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WorkoutRoutingModule } from './workout-routing.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { WorkoutsListComponent } from './components/workouts-list/workouts-list.component';

import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ExerciseOverviewComponent } from './components/exercise-overview/exercise-overview.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [WorkoutsListComponent, ExerciseOverviewComponent],
  imports: [
    CommonModule,
    WorkoutRoutingModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    HttpClientModule,
    InfiniteScrollModule,
    SharedModule,
  ],
})
export class WorkoutModule {}
