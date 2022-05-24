import { Component, OnInit } from '@angular/core';
import { Option } from './interfaces';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  options: Option[] = [
    { name: 'Overview', iconRef: 'home' },
    { name: 'Calendar', iconRef: 'calendar_month' },
    { name: 'Schedule', iconRef: 'schedule' },
  ];

  activities: Option[] = [
    { name: 'Workouts', iconRef: 'fitness_center' },
    { name: 'Wallking', iconRef: 'directions_walk' },
    { name: 'Running', iconRef: 'directions_run' },
    { name: 'Food', iconRef: 'local_fire_department' },
  ];

  username: string = 'Cris';

  constructor() {}

  ngOnInit(): void {}
}
