import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AppWindowService } from './core/services/app-window.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'my-portfolio';
  public visible: boolean = false;

  constructor(private primengConfig: PrimeNGConfig, private appWindowService: AppWindowService) { }

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.appWindowService.isVisible$.subscribe((isVisible) => {
      this.visible = isVisible;
    });

    const draggableDiv = document.getElementById("draggable") as HTMLElement;

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
}
