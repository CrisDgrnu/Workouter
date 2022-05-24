import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AutoCharImageComponent } from './components/auto-char-image/auto-char-image.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [SidebarComponent, AutoCharImageComponent],
  imports: [CommonModule, MatListModule, MatIconModule, MatButtonModule],
  exports: [SidebarComponent, AutoCharImageComponent],
})
export class SharedModule {}
