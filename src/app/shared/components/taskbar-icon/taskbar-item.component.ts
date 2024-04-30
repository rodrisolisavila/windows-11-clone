import { Component, Input } from '@angular/core';
import { AppWindowService } from '../../../core/services/app-window.service';

@Component({
  selector: 'taskbar-item',
  templateUrl: './taskbar-item.component.html',
  styleUrl: './taskbar-item.component.css'
})
export class TaskbarItemComponent {
  @Input()
  public id: string = '';

  @Input()
  public image_path: string = '';
}
