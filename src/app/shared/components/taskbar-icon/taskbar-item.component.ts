import { Component, Input } from '@angular/core';
import { WindowService } from '../../../core/services/window.service';

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
