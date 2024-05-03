import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppWindowService } from '../../services/app-window.service';
import { IconDesktop } from '../../interfaces/icondesktop.interface';
import { Icon } from '../../interfaces/icon.interface';
import { IconService } from '../../services/icon.service';


@Component({
  selector: 'window',
  templateUrl: './window.component.html',
  styleUrl: './window.component.css'
})
export class WindowComponent implements OnInit {

  @ViewChild('window') window!: ElementRef<HTMLElement>;

  public visible: boolean = false;
  public id: string = '';
  public icon: IconDesktop | undefined;

  constructor(private appWindowService: AppWindowService, private iconService: IconService) { }

  ngOnInit() {
    this.appWindowService.isVisible$.subscribe((isVisible) => {
      this.visible = isVisible;
      console.log(this.visible);
    });

    this.appWindowService.id$.subscribe((id) => {
      this.id = id;
      this.iconService.getIconById(id).subscribe(icon => {
        this.icon = icon
      })
    });

  }

  ngAfterViewInit() {
    const draggableDiv = this.window.nativeElement.parentElement;

    if (draggableDiv) {
      let isDragging = false;
      let offsetX: number;
      let offsetY: number;

      draggableDiv.addEventListener("mousedown", (event: MouseEvent) => {
        isDragging = true;
        offsetX = event.clientX - draggableDiv.offsetLeft;
        offsetY = event.clientY - draggableDiv.offsetTop;

        draggableDiv.style.cursor = "grabbing";
      });

      document.addEventListener("mousemove", (event: MouseEvent) => {
        if (isDragging) {
          let newLeft = event.clientX - offsetX;
          let newTop = event.clientY - offsetY;

          const maxRight = window.innerWidth - draggableDiv.clientWidth;
          const maxBottom = window.innerHeight - draggableDiv.clientHeight;

          newLeft = Math.max(0, Math.min(maxRight, newLeft));
          newTop = Math.max(0, Math.min(maxBottom, newTop));

          draggableDiv.style.left = `${newLeft}px`;
          draggableDiv.style.top = `${newTop}px`;
        }
      });

      document.addEventListener("mouseup", () => {
        isDragging = false;
        draggableDiv.style.cursor = "grab";
      });

      draggableDiv.style.position = "absolute";
      draggableDiv.style.cursor = "grab";
    }
  }

  addIcon() {
    const newIcon: Icon = {
      name: this.icon!.name,
      id: this.icon!.id,
      image_path: this.icon!.image_path,
    };
    this.iconService.addDesktopIcon(newIcon);
    this.appWindowService.hideWindow();
  }

  maximizeWindow() { }

  deleteIcon() {
    this.window.nativeElement.classList.add('close-app');
    this.iconService.deleteIconById(this.id);
    setTimeout(() => {
      this.appWindowService.hideWindow();
      this.window.nativeElement.classList.remove('close-app');
    }, 100);
  }

}
