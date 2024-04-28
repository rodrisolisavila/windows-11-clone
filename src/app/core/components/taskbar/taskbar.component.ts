import { Component  } from '@angular/core';
import { IconService } from '../../services/icon.service';
import { Icon } from '../../interfaces/icon.interface';

@Component({
  selector: 'taskbar',
  templateUrl: './taskbar.component.html',
  styleUrl: './taskbar.component.css'
})
export class TaskbarComponent {

  public icons:Icon[] = [];

  constructor(private iconService: IconService) 
  {
    this.iconService.getTaskbarIcons().subscribe( icons =>  {
      this.icons = icons;
      console.log(icons);
    });
  }

}
