import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('window')
  public window!: ElementRef<HTMLInputElement>;

  @ViewChild('taskbar')
  public taskbar!: ElementRef<HTMLInputElement>;

  @ViewChild('tabImage')
  public tabImage!: ElementRef<HTMLInputElement>;


  public visible: boolean = false;
  public id: string = '';
  public icon: IconDesktop | undefined;

  constructor(private appWindowService: AppWindowService,private iconService:IconService) { }

  ngOnInit() {
    this.appWindowService.isVisible$.subscribe((isVisible) => {
      this.visible = isVisible;
    });

    this.appWindowService.id$.subscribe((id) => {
      this.id =  id;
      this.iconService.getIconById(id).subscribe( icon => {
        this.icon = icon
      })
    }); 
  }

  closeWindow() {
    this.appWindowService.hideWindow();
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

  maximizeWindow(){}

  deleteIcon() {
    this.iconService.deleteIconById(this.id);
    this.appWindowService.hideWindow();
  }

}
