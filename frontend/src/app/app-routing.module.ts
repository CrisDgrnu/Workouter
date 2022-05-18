import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { WorkoutsListComponent } from './modules/workout/components/workouts-list/workouts-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'workouts', pathMatch: 'full' },
  { path: 'workouts', component: WorkoutsListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
