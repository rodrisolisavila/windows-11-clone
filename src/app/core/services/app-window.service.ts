import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppWindowService {

  private _isVisible = new BehaviorSubject<boolean>(false);
  isVisible$ = this._isVisible.asObservable();

  showWindow() {
    this._isVisible.next(true);
  }

  hideWindow() {
    this._isVisible.next(false);
  }
}