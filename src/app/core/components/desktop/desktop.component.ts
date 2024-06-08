import { Component } from '@angular/core';
import { WindowService } from '../../services/window.service';
import { IconService } from '../../services/icon.service';
import { Icon } from '../../interfaces/icon.interface';

@Component({
  selector: 'desktop',
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.css'
})
export class DesktopComponent {

  public icons: Icon[] = [];

  constructor(private iconService: IconService, private windowService: WindowService,) {
    this.iconService.iconDesktop$.subscribe((icons) => {
      this.icons = icons;
    });
  }

  openApp(id: string) {
    this.windowService.showWindow(id);
  }
}
