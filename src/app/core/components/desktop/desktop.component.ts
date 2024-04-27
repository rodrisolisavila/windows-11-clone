import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'desktop',
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.css'
})
export class DesktopComponent {

  @Output()
  public onOpenApp: EventEmitter<string> = new EventEmitter();

  constructor() {}

  openApp(){
    this.onOpenApp.emit('');
  }
}
