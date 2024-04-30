import { Component  } from '@angular/core';
import { IconService } from '../../services/icon.service';
import { Icon } from '../../interfaces/icon.interface';
import { AppWindowService } from '../../../core/services/app-window.service';

@Component({
  selector: 'taskbar',
  templateUrl: './taskbar.component.html',
  styleUrl: './taskbar.component.css'
})
export class TaskbarComponent {

  public icons:Icon[] = [];

  constructor(private iconService: IconService, private appWindowService:AppWindowService) 
  {
    this.iconService.iconTaskbar$.subscribe((icons) => {
      this.icons = icons;
    });
  }

  openApp(id: string) {
    this.appWindowService.showWindow(id);
  }

}
