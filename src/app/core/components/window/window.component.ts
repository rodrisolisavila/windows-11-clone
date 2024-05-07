import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppWindowService } from '../../services/app-window.service';
import { IconService } from '../../services/icon.service';
import { IconDesktop } from '../../interfaces/icondesktop.interface';
import { Icon } from '../../interfaces/icon.interface';

@Component({
  selector: 'window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})
export class WindowComponent implements OnInit {
  @ViewChild('window') window!: ElementRef<HTMLElement>;

  public visible = false;
  public maximized = false;
  public id = '';
  public icon?: IconDesktop;

  constructor(
    private appWindowService: AppWindowService,
    private iconService: IconService
  ) { }

  ngOnInit(): void {
    this.appWindowService.isVisible$.subscribe(isVisible => {
      this.visible = isVisible;
      if (this.window) this.setWindowVisibility(isVisible);
    });

    this.appWindowService.id$.subscribe(id => {
      this.id = id;
      this.fetchIcon(id);
    });
  }

  private setWindowVisibility(isVisible: boolean): void {
    const parent = this.window.nativeElement.parentElement!;
    parent.style.display = isVisible ? 'block' : 'none';
  }

  private fetchIcon(id: string): void {
    this.iconService.getIconById(id).subscribe(icon => {
      this.icon = icon;
      this.addIcon();
    });
  }

  addIcon(): void {
    if (!this.icon) return;
    const newIcon: Icon = {
      name: this.icon.name,
      id: this.icon.id,
      image_path: this.icon.image_path,
    };
    this.iconService.addDesktopIcon(newIcon);
  }

  minimize(): void {
    this.maximized = false;
    this.window.nativeElement.classList.add('close-app');
    setTimeout(() => {
      const parent = this.window.nativeElement.parentElement!;
      parent.style.top = 'calc((100% - 300px) / 2)';
      parent.style.left = 'calc((100% - 320px) / 2)';
      parent.style.display = 'none';
      parent.classList.remove('window-maximized');
      this.appWindowService.hideWindow();
      this.window.nativeElement.classList.remove('close-app');
    }, 100);
  }

  maximize(): void {
    this.maximized = !this.maximized;
    const parent = this.window.nativeElement.parentElement!;
    if (this.maximized) {
      parent.style.top = '0';
      parent.style.left = '0';
      parent.classList.add('window-maximized');
    } else {
      parent.style.top = 'calc((100% - 300px) / 2)';
      parent.style.left = 'calc((100% - 320px) / 2)';
      parent.classList.remove('window-maximized');
    }
  }

  close(): void {
    this.maximized = false;
    this.window.nativeElement.classList.add('close-app');
    this.iconService.deleteIconById(this.id);
    setTimeout(() => {
      const parent = this.window.nativeElement.parentElement!;
      parent.style.top = 'calc((100% - 300px) / 2)';
      parent.style.left = 'calc((100% - 320px) / 2)';
      parent.style.display = 'none';
      parent.classList.remove('window-maximized');
      this.appWindowService.hideWindow();
      this.window.nativeElement.classList.remove('close-app');
    }, 100);
  }
}
