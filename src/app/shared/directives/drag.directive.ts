import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[draggable]' // Afectará solo a elementos con este atributo
})
export class DraggableDirective {
  private isDragging = false;
  private offsetX!: number;
  private offsetY!: number;

  constructor(private el: ElementRef<HTMLElement>) {
    this.initialize();
  }

  private initialize(): void {
    const parent = this.el.nativeElement;
    parent.style.position = 'absolute';
    parent.style.cursor = 'grab';
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    const parent = this.el.nativeElement;
    this.offsetX = event.clientX - parent.offsetLeft;
    this.offsetY = event.clientY - parent.offsetTop;
    parent.style.cursor = 'grabbing';
    event.stopPropagation(); // Para evitar propagación de eventos
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isDragging) {
      const parent = this.el.nativeElement;
      let newLeft = event.clientX - this.offsetX;
      let newTop = event.clientY - this.offsetY;

      const maxRight = window.innerWidth - parent.clientWidth;
      const maxBottom = window.innerHeight - parent.clientHeight;

      newLeft = Math.max(0, Math.min(maxRight, newLeft));
      newTop = Math.max(0, Math.min(maxBottom, newTop));

      parent.style.left = `${newLeft}px`;
      parent.style.top = `${newTop}px`;
      event.stopPropagation(); // Evitar propagación de eventos
    }
  }

  @HostListener('mouseup')
  onMouseUp(): void {
    this.isDragging = false;
    const parent = this.el.nativeElement;
    parent.style.cursor = 'grab';
  }
}
