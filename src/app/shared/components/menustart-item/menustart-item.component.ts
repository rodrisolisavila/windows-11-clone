import { Component, Input } from '@angular/core';

@Component({
  selector: 'menustart-item',
  templateUrl: './menustart-item.component.html',
  styleUrl: './menustart-item.component.css'
})
export class MenustartItemComponent {
  @Input()
  public id: string = '';

  @Input()
  public image_path: string = '';

  constructor() {}
}
