import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllNumbers } from '../allNumbers.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public totalPoints: number;
  public isImage1: boolean;
  public playerName: string;

  constructor(private router: Router, private allNumbers: AllNumbers) { 
    this.totalPoints = this.allNumbers.totalPoints;
    this.isImage1 = this.allNumbers.mute;
    this.playerName = this.allNumbers.playerName;
  }


  ngOnInit() {
    this.allNumbers.totalPoints$.subscribe(points => {
      this.totalPoints = points;
    });
    this.allNumbers.muteOb.subscribe(ismuted => {
      this.isImage1 = ismuted;
    })
    this.allNumbers.name$.subscribe(name =>{
      this.playerName = name;
    })
    this.allNumbers.color$.subscribe(color =>{
      mainDiv!.style.backgroundColor = color;
    })
    const mainDiv = document.getElementById('mainDiv');
    
    //mainDiv!.style.backgroundColor = this.allNumbers.color;
  }


  mute(){
    this.allNumbers.muteBool();
  }
  setPoints(points: number){
    this.totalPoints += points;
  }
  

  changePage(event: MouseEvent) {
    const button = event.target;
    if (button instanceof HTMLButtonElement){
      this.router.navigate([button.textContent])
      //console.log(button.textContent)
    }
  }

}
