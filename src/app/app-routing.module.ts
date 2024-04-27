import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesktopComponent } from './core/components/desktop/desktop.component';

const routes: Routes = [
  {
    path: 'desktop',
    component: DesktopComponent
  },
  {
    path: '**',
    redirectTo: 'desktop'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
