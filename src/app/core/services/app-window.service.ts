import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppWindowService {

  private _isVisible = new BehaviorSubject<boolean>(false);
  isVisible$ = this._isVisible.asObservable();

  private _id = new BehaviorSubject<string>('');
  id$ = this._id.asObservable();

  constructor() {}

  showWindow(id: string) {
    this._isVisible.next(true);
    this._id.next(id);
  }

  hideWindow() {
    this._isVisible.next(false);
  }

}