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

      // Comienza a arrastrar cuando se presiona el mouse
      draggableDiv.addEventListener("mousedown", (event: MouseEvent) => {
        isDragging = true;
        // Calcula la posición inicial del mouse respecto al `div`
        offsetX = event.clientX - draggableDiv.offsetLeft;
        offsetY = event.clientY - draggableDiv.offsetTop;

        draggableDiv.style.cursor = "grabbing";
      });

      // Mueve el `div` siguiendo el mouse, dentro de los límites de la pantalla
      document.addEventListener("mousemove", (event: MouseEvent) => {
        if (isDragging) {
          let newLeft = event.clientX - offsetX;
          let newTop = event.clientY - offsetY;

          // Limitar la posición del `div` para que no se salga del `viewport`
          const maxRight = window.innerWidth - draggableDiv.clientWidth;
          const maxBottom = window.innerHeight - draggableDiv.clientHeight;

          newLeft = Math.max(0, Math.min(maxRight, newLeft));
          newTop = Math.max(0, Math.min(maxBottom, newTop));

          draggableDiv.style.left = `${newLeft}px`;
          draggableDiv.style.top = `${newTop}px`;
        }
      });

      // Deja de arrastrar cuando se suelta el mouse
      document.addEventListener("mouseup", () => {
        isDragging = false;
        draggableDiv.style.cursor = "grab";
      });

      // Ajusta el estilo inicial del `div`
      draggableDiv.style.position = "absolute";  // Necesario para que el `div` pueda moverse
      draggableDiv.style.cursor = "grab";  // Cambia el cursor para mostrar que es arrastrable
    }
  }
}
