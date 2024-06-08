import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { Icons } from '../interfaces/icons.interface';
import { Icon } from '../interfaces/icon.interface';
import { IconDesktop } from '../interfaces/icondesktop.interface';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  private _iconDesktop = new BehaviorSubject<IconDesktop[]>([
    {
      name: 'NyarukoNV',
      id: 'nyarukonv',
      image_path: 'app/assets/icons/desktop/nyarukonv.png',
      window_title: 'Nyaruko NV',
      url: '',
    },
    {
      name: 'Code',
      id: 'vscode',
      image_path: 'app/assets/icons/desktop/vscode.svg',
      window_title: 'Code',
      url: '',
    },
  ]);

  private _iconTaskbar = new BehaviorSubject<Icon[]>([
    // {
    //   name: "Start",
    //   id: "start",
    //   image_path: "app/assets/icons/taskbar/Start_Light.png"
    // },
    // {
    //   name: "Search",
    //   id: "search",
    //   image_path: "app/assets/icons/taskbar/Search_Light.png"
    // },
    // {
    //   name: "Widgets",
    //   id: "widgets",
    //   image_path: "app/assets/icons/taskbar/Widgets.png"
    // }
  ])

  iconDesktop$ = this._iconDesktop.asObservable();
  iconTaskbar$ = this._iconTaskbar.asObservable();

  constructor() { }

  addDesktopIcon(newIcon: Icon) {
    const currentIcons = this._iconTaskbar.getValue(); // Obtiene el arreglo actual de íconos
    const iconExists = currentIcons.some((icon) => icon.id === newIcon.id); // Verifica si el ID ya existe
    
    if (iconExists) {
      console.warn(`Icon with id '${newIcon.id}' already exists. Skipping add operation.`);
    } else {
      this._iconTaskbar.next([...currentIcons, newIcon]); // Agrega el nuevo ícono si no hay duplicado
    }
  }

  deleteIconById(id: string) {
    const currentIcons = this._iconTaskbar.getValue(); // Obtiene los íconos actuales
    const iconIndex = currentIcons.findIndex((icon) => icon.id === id); // Encuentra el índice del ícono con el ID dado

    if (iconIndex >= 0) {
      // Si se encuentra el ícono, elimina del arreglo
      const updatedIcons = [...currentIcons]; // Crea una copia del arreglo
      updatedIcons.splice(iconIndex, 1); // Elimina el ícono por índice
      this._iconTaskbar.next(updatedIcons); // Actualiza el BehaviorSubject
    } else {
      console.warn(`Icon with id '${id}' not found. No action taken.`); // Advertencia si no se encuentra
    }
  }

  getIconById(id: string): Observable<IconDesktop | undefined> {
    return this.iconDesktop$.pipe(
      map((icons) => icons.find((icon) => icon.id === id)), // Encuentra el ícono por ID
    );
  }

}
