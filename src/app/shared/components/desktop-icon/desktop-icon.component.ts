import { Component, Input } from '@angular/core';

@Component({
  selector: 'desktop-icon',
  templateUrl: './desktop-icon.component.html',
  styleUrl: './desktop-icon.component.css'
})
export class DesktopIconComponent {

  @Input()
  public id: string = '';

  @Input()
  public image_path: string = '';

  constructor() {}

}
