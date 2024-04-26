import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrl: './taskbar.component.css'
})
export class TaskbarComponent {

  @ViewChild('windowApp')
  public windowApp!: ElementRef<HTMLInputElement>;

  @ViewChild('taskbar')
  public taskbar!: ElementRef<HTMLInputElement>;

  @ViewChild('tabImage')
  public tabImage!: ElementRef<HTMLInputElement>;
  

  public visible: boolean = false;
  public visibleWindow: boolean = true;

  constructor() { }

  showDialog() {
    this.visible = !this.visible;
  }

  minimizeWindow() {
    this.visibleWindow = !this.visibleWindow;
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
    this.taskbar.nativeElement.appendChild(newDivNav);
    console.log("MINIMIZED TAB");
  }

  maximizeWindow() {
    this.windowApp.nativeElement.style.left = 0 + "px";
    this.windowApp.nativeElement.style.top = 0 + "px";
    this.windowApp.nativeElement.style.removeProperty("right");
    this.windowApp.nativeElement.style.removeProperty("transform");
    this.windowApp.nativeElement.style.width = "100vw";
    this.windowApp.nativeElement.style.height = "calc(100vh - var(--nav-height))";
    this.windowApp.nativeElement.style.transitionDuration = "0.5s";
    console.log("TOP TAB");
  }

  closeWindow() {
    this.visibleWindow = !this.visibleWindow;
  }


}
