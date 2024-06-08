import { Component, OnDestroy, OnInit } from '@angular/core';
import { IconService } from '../../services/icon.service';
import { Icon } from '../../interfaces/icon.interface';
import { WindowService } from '../../services/window.service';
import { DatePipe } from '@angular/common';
import { Subscription, interval } from 'rxjs';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'taskbar',
  templateUrl: './taskbar.component.html',
  styleUrl: './taskbar.component.css'
})
export class TaskbarComponent implements OnInit, OnDestroy {

  public icons: Icon[] = [];

  currentTime: string | null = null;
  private clockSubscription?: Subscription;

  currentDate: string | null = null;
  private dateSubscription?: Subscription;

  constructor(private iconService: IconService,
    private windowService: WindowService,
    private menuService: MenuService,
    private datePipe: DatePipe) {
    this.iconService.iconTaskbar$.subscribe((icons) => {
      this.icons = icons;
    });
  }

  ngOnInit(): void {
    this.clockSubscription = interval(1000).subscribe(() => {
      this.updateTime();
    });
    this.updateTime();

    this.dateSubscription = interval(24 * 60 * 60 * 1000).subscribe(() => {
      this.updateDate();
    });
    this.updateDate();
  }

  ngOnDestroy(): void {
    if (this.clockSubscription) {
      this.clockSubscription.unsubscribe();
    }
    if (this.dateSubscription) {
      this.dateSubscription.unsubscribe();
    }
  }

  private updateTime(): void {
    const now = new Date();
    this.currentTime = this.datePipe.transform(now, 'hh:mm a');
  }

  openApp(id: string) {
    this.windowService.showWindow(id);
  }

  private updateDate(): void {
    const now = new Date();
    this.currentDate = this.datePipe.transform(now, 'dd/MM/yyyy');
  }

  displayStartMenu(): void {
    this.menuService.showMenuStart();
  }

  displayWidgets(): void {
    this.menuService.showWidgets();
  }

  displaySystemIcons(): void {
    this.menuService.showSystemIcons();
  }

  displayDateTime(): void {
    this.menuService.showDateTime();
  }

}
