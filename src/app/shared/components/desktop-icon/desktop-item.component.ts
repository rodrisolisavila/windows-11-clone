import { Component, Input } from '@angular/core';

@Component({
  selector: 'desktop-item',
  templateUrl: './desktop-item.component.html',
  styleUrl: './desktop-item.component.css'
})
export class DesktopItemComponent {

  @Input()
  public id: string = '';

  @Input()
  public image_path: string = '';

  constructor() {}

}
