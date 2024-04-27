import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Icons } from '../interfaces/icons.interface';
import { Icon } from '../interfaces/icon.interface';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  private iconDataUrl = 'app/assets/static/icons.json';

  constructor(private http: HttpClient) { }

  getDesktopIcons(): Observable<any> {
    return this.http.get(`${this.iconDataUrl}`);
  }

  getTaskbarIcons(): Observable<Icon[]> {
    return this.http.get<{ taskbar_icons: Icon[] }>(`${this.iconDataUrl}`).pipe(
      map(data => data.taskbar_icons || []),
      catchError(() => of([])),
    );
  }

}
