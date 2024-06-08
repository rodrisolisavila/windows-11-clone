import { Component, ElementRef, ViewChild } from '@angular/core';
import { Icon } from '../../interfaces/icon.interface';
import { IconService } from '../../services/icon.service';
import { WindowService } from '../../services/window.service';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'menu-start',
  templateUrl: './menu-start.component.html',
  styleUrl: './menu-start.component.css'
})
export class MenuStartComponent {

  @ViewChild('menustart') menustart!: ElementRef<HTMLElement>;

  public icons: Icon[] = [];

  constructor(private iconService: IconService,
    private windowService: WindowService,
    private menuService: MenuService) {
    this.iconService.iconDesktop$.subscribe((icons) => {
      this.icons = icons;
    });

    this.menuService.isVisibleMenuStart$.subscribe(isVisibleMenuStart => {
      if (this.menustart) this.setWindowVisibility(isVisibleMenuStart);
    });
  }

  openApp(id: string) {
    this.windowService.showWindow(id);
  }

  private setWindowVisibility(isVisible: boolean): void {
    if (isVisible) {
      this.menustart.nativeElement.parentElement!.style.display = 'block';
    } else {
      this.menustart.nativeElement.parentElement!.classList.add('hide-menu-start');
      setTimeout(() => {
        this.menustart.nativeElement.parentElement!.classList.remove('hide-menu-start');
        this.menustart.nativeElement.parentElement!.style.display = 'none';
      }, 150);
    }
  }
}
