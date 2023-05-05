import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllNumbers {
  private totalPointsSubject = new Subject<number>();
  private muteSubject = new Subject<boolean>();
  private nameSubject = new Subject<string>();
  private colorSubject = new Subject<string>();


  totalPoints$ = this.totalPointsSubject.asObservable();
  name$ = this.nameSubject.asObservable();
  color$ = this.colorSubject.asObservable();
  muteOb = this.muteSubject.asObservable();


  private _playerName: string = '';
  private _color:string = '';

  private _totalPoints: number = 0;
  private _multiplier: number = 0;
  private _clickers: number = 0;
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

  get multiplier(): number {
    const storedValue = localStorage.getItem('multiplier');
    return storedValue !== null ? parseInt(storedValue, 10) : this._multiplier;
  }
  set multiplier(value: number) {
    localStorage.setItem('multiplier', value.toString());
    this._multiplier = value;
  }


  get clickers(): number {
    const storedValue = localStorage.getItem('clickers');
    return storedValue !== null ? parseInt(storedValue, 10) : this._clickers;
  }
  set clickers(value: number) {
    localStorage.setItem('clickers', value.toString());
    this._clickers = value;
  }

  muteBool() {
    this._mute = !this._mute;
    localStorage.setItem('muted', this._mute.toString());
    this.muteSubject.next(this._mute);
  }
  get mute(): boolean {
    const storedValue = localStorage.getItem('muted');
    return storedValue !== null ? (storedValue === 'true') : this._mute;
  }

  set playerName(name: string){
    this._playerName = name;
    localStorage.setItem('name', name);
    this.nameSubject.next(name);
  }
  get playerName(): string{
    const storedValue = localStorage.getItem('name');
    return storedValue !== null ? storedValue : this._playerName;
  }

  get color(): string{
    const storedValue = localStorage.getItem('color');
    return storedValue !== null ? storedValue : this._color;
  }
  set color(color: string){
    this._color = color;
    localStorage.setItem('color', color);
    this.colorSubject.next(color);
  }

}
