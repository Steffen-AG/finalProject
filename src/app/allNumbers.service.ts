import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllNumbers {
  private totalPointsSubject = new Subject<number>();
  private muteSubject = new Subject<boolean>();
  totalPoints$ = this.totalPointsSubject.asObservable();
  muteOb = this.muteSubject.asObservable();


  private _playerName: string = '';
  private _color:string = '';

  private _totalPoints: number = 0;
  private _mute: boolean = false;
  get totalPoints(): number {
    const storedValue = localStorage.getItem('totalPoints');
    return storedValue !== null ? parseInt(storedValue, 10) : this._totalPoints;
  }
  set totalPoints(value: number) {
    localStorage.setItem('totalPoints', value.toString());
    this._totalPoints = value;
    this.totalPointsSubject.next(value);
  }

  muteBool() {
    this._mute = !this.mute;
    this.muteSubject.next(this._mute);
  }
  get mute(): boolean {
    return this._mute;
  }

  set playerName(name: string){
    this._playerName = name;
    localStorage.setItem('name', name);
  }
  get playerName(): string{
    const storedValue = localStorage.getItem('name');
    return storedValue !== null ? storedValue : this._playerName;
  }

  get color(): string{
    return this._color;
  }
  set color(color: string){
    this._color = color;
  }

}
