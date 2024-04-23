import { Component } from '@angular/core';

@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrl: './taskbar.component.css'
})
export class TaskbarComponent {

  public visible: boolean = false;

  constructor() {}

  showDialog(){
    this.visible = !this.visible;
  }

}
