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
import { DesktopItemComponent } from './shared/components/desktop-icon/desktop-item.component';
import { TaskbarItemComponent } from './shared/components/taskbar-icon/taskbar-item.component';
import { MenustartItemComponent } from './shared/components/menustart-item/menustart-item.component';
import { SystemiconsComponent } from './core/components/systemicons/systemicons.component';
import { DateTimeComponent } from './core/components/date-time/date-time.component';
import { DatePipe } from '@angular/common';
import { WidgetsComponent } from './core/components/widgets/widgets.component'; 
import { DraggableDirective } from './shared/directives/drag.directive';

@NgModule({
  declarations: [
    AppComponent,
    DesktopComponent,
    TaskbarComponent,
    WindowComponent,
    ActionCenterComponent,
    MenuStartComponent,
    DesktopItemComponent,
    TaskbarItemComponent,
    MenustartItemComponent,
    SystemiconsComponent,
    DateTimeComponent,
    WidgetsComponent,
    DraggableDirective 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DialogModule,
    BrowserAnimationsModule,
    InputTextModule,
    AvatarModule,
    AvatarGroupModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
