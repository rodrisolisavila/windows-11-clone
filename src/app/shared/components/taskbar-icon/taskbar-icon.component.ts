import { Component, Input } from '@angular/core';
import { AppWindowService } from '../../../core/services/app-window.service';

@Component({
  selector: 'app-taskbar-icon',
  templateUrl: './taskbar-icon.component.html',
  styleUrl: './taskbar-icon.component.css'
})
export class TaskbarIconComponent {
  @Input()
  public id: string = '';

  @Input()
  public image_path: string = '';

  constructor(private appWindowService:AppWindowService) {}

  openApp(id: string) {
    this.appWindowService.showWindow(id);
  }

}
