import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'widgets',
  templateUrl: './widgets.component.html',
  styleUrl: './widgets.component.css'
})
export class WidgetsComponent {
  
  @ViewChild('widgets') widgets!: ElementRef<HTMLElement>;

  constructor(private menuService: MenuService){
    this.menuService.isVisibleWidgets$.subscribe(isVisibleWidgets => {
      if (this.widgets) this.setWindowVisibility(isVisibleWidgets);
    });
  }

  private setWindowVisibility(isVisible: boolean): void {
    if (isVisible) {
      this.widgets.nativeElement.parentElement!.style.display = 'block';
    } else {
      this.widgets.nativeElement.parentElement!.classList.add('hide-widgets');
      setTimeout(() => {
        this.widgets.nativeElement.parentElement!.classList.remove('hide-widgets');
        this.widgets.nativeElement.parentElement!.style.display = 'none';
      }, 150);
    }
  }
}


