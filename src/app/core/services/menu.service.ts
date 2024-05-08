import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    private _isVisibleMenuStart = new BehaviorSubject<boolean>(false);
    isVisibleMenuStart$ = this._isVisibleMenuStart.asObservable();

    private _isVisibleWidgets = new BehaviorSubject<boolean>(false);
    isVisibleWidgets$ = this._isVisibleWidgets.asObservable();

    private _isVisibleSystemIcons = new BehaviorSubject<boolean>(false);
    isVisibleSystemIcons$ = this._isVisibleSystemIcons.asObservable();

    private _isVisibleDateTime = new BehaviorSubject<boolean>(false);
    isVisibleDateTime$ = this._isVisibleDateTime.asObservable();

    constructor() { }

    showMenuStart(): void {
        this._isVisibleMenuStart.next(!this._isVisibleMenuStart.getValue());
    }

    showWidgets(): void {
        this._isVisibleWidgets.next(!this._isVisibleWidgets.getValue());
    }

    showSystemIcons(): void {
        this._isVisibleSystemIcons.next(!this._isVisibleSystemIcons.getValue());
    }

    showDateTime(): void {
        this._isVisibleDateTime.next(!this._isVisibleDateTime.getValue());
    }
}