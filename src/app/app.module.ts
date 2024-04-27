import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DesktopComponent } from './core/components/desktop/desktop.component';
import { TaskbarComponent } from './core/components/taskbar/taskbar.component';
import { WindowComponent } from './core/components/window/window.component';
import { ActionCenterComponent } from './core/components/action-center/action-center.component';
import { MenuStartComponent } from './core/components/menu-start/menu-start.component';
import { DesktopIconComponent } from './shared/components/desktop-icon/desktop-icon.component';
import { TaskbarIconComponent } from './shared/components/taskbar-icon/taskbar-icon.component';

@NgModule({
  declarations: [
    AppComponent,
    DesktopComponent,
    TaskbarComponent,
    WindowComponent,
    ActionCenterComponent,
    MenuStartComponent,
    DesktopIconComponent,
    TaskbarIconComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DialogModule,
    BrowserAnimationsModule,
    InputTextModule,
    AvatarModule,
    AvatarGroupModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
