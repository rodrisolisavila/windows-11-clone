import { Component, Input } from '@angular/core';

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

}
