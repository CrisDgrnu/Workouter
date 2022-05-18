import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Angular libs
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular material
import { MatCardModule } from '@angular/material/card';

// Modules
import { WorkoutModule } from './modules/workout/workout.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    WorkoutModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
