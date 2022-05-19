import { Component, OnInit } from '@angular/core';
import { Avatar, Option } from './interfaces';
import { SidebarService } from './sidebar.service';

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

  avatar: Avatar = {
    pseudoName: 'WK',
    rgbColor: 'rgb(2,103,255)',
  };

  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.avatar = {
      //TODO: Get pseudoname from a service when the system has loggin system
      pseudoName: 'AN',
      rgbColor: this.sidebarService.getRgbColor('AN'),
    };
  }
}
