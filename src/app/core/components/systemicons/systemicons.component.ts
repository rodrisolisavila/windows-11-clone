import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'systemicons',
  templateUrl: './systemicons.component.html',
  styleUrl: './systemicons.component.css'
})
export class SystemiconsComponent {

  @ViewChild('systemicons') systemicons!: ElementRef<HTMLElement>;

  rangeValue: number = 30;

  constructor(private menuService: MenuService){
    this.menuService.isVisibleSystemIcons$.subscribe(isVisibleSystemIcons => {
      if (this.systemicons) this.setWindowVisibility(isVisibleSystemIcons);
    });
  }

  private setWindowVisibility(isVisible: boolean): void {
    if (isVisible) {
      this.systemicons.nativeElement.parentElement!.style.display = 'block';
    } else {
      this.systemicons.nativeElement.parentElement!.classList.add('hide-systemicons');
      setTimeout(() => {
        this.systemicons.nativeElement.parentElement!.classList.remove('hide-systemicons');
        this.systemicons.nativeElement.parentElement!.style.display = 'none';
      }, 150);
    }
  }

  getRangeBackground(): string {
    const percentage = (this.rangeValue / 60) * 100;
    return `linear-gradient(to right, #0652f7 0%, #0652f7 ${percentage}%, #fff ${percentage}%, #fff 100%)`;
  }

  onRangeChange(event: any) {
    this.rangeValue = event.target.value;
  }

}
