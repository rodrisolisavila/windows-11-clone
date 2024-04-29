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
      this.id =  id; // Asigna el ícono encontrado
      this.iconService.getIconById(id).subscribe( icon => {
        this.icon = icon
      })
    }); 
  }

  closeWindow() {
    this.appWindowService.hideWindow();
  }

  minimizeWindow() {
    this.visible = !this.visible;
    let newDivNav = document.createElement("div");
    newDivNav.classList.add("transition-duration-200");
    newDivNav.classList.add("align-content-center");
    newDivNav.classList.add("justify-content-center");
    newDivNav.style.aspectRatio = "1";
    newDivNav.style.borderRadius = "0.1rem";
    newDivNav.style.height = "85%";
    newDivNav.style.display = "grid";
    newDivNav.style.borderTop = "1px solid rgba(255, 255, 255, 0.0)";
    let newImageIconNav = document.createElement("img");
    newImageIconNav.style.aspectRatio = "1";
    newImageIconNav.style.borderRadius = "0.1em";
    newImageIconNav.style.height = "var(--img-nav-height)";
    newImageIconNav.src = this.tabImage.nativeElement.src;
    newDivNav.appendChild(newImageIconNav);
    let taskbar2 =  document.getElementById("taskbar");
    taskbar2?.appendChild(newDivNav);
    //this.taskbar.nativeElement.appendChild(newDivNav);
    console.log("MINIMIZED TAB");
  }

  maximizeWindow() {
    this.window.nativeElement.style.left = 0 + "px";
    this.window.nativeElement.style.top = 0 + "px";
    this.window.nativeElement.style.removeProperty("right");
    this.window.nativeElement.style.removeProperty("transform");
    this.window.nativeElement.style.width = "100vw";
    this.window.nativeElement.style.height = "calc(100vh - var(--nav-height))";
    this.window.nativeElement.style.transitionDuration = "0.5s";
    console.log("TOP TAB");
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

  deleteIcon(id: string) {
    this.iconService.deleteIconById(id);
    this.appWindowService.hideWindow();
  }

}
