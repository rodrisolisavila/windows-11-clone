import { Component } from '@angular/core';
import { Icon } from '../../interfaces/icon.interface';
import { IconService } from '../../services/icon.service';
import { AppWindowService } from '../../services/app-window.service';

@Component({
  selector: 'menu-start',
  templateUrl: './menu-start.component.html',
  styleUrl: './menu-start.component.css'
})
export class MenuStartComponent {
  public icons: Icon[] = [];

  constructor(private iconService: IconService, private appWindowService: AppWindowService,) {
    this.iconService.iconDesktop$.subscribe((icons) => {
      this.icons = icons;
    });
  }


  openApp(id: string) {
    this.appWindowService.showWindow(id);
  }
}
