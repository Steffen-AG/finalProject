import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllNumbers } from '../allNumbers.service';

@Component({
  selector: 'app-click-component',
  templateUrl: './click-component.component.html',
  styleUrls: ['./click-component.component.css']
})
export class ClickComponent implements OnInit, OnDestroy {
  public multi: number;
  public cost: number;
  public clickers: number;
  public randNum: number;
  public clickersCost: number;
  public isClicked: boolean;
  private audio: HTMLAudioElement;
  private shouldPlay: boolean;


  constructor(private router: Router, private allNumbers: AllNumbers) {
    this.shouldPlay = true;
    this.multi = 1;
    this.cost = 100;
    this.clickers = 0;
    this.clickersCost = 100;
    this.randNum = 0;
    this.isClicked = false;
    this.audio = new Audio('../../assets/Ape Escape Soundtrack - 35 - Specter Circus.mp3');
    this.audio.loop = true;
    this.allNumbers.muteOb.subscribe((mute: boolean) => {
      if (mute) {
        this.audio.volume = 0;
        this.shouldPlay = mute;
      } else {
        this.audio.volume = 0.5;
        this.shouldPlay = mute;
      }
    });
    const multiValue = localStorage.getItem('multi');
    const costValue = localStorage.getItem('cost');
    const clcikersValue = localStorage.getItem('clicker');
    const clickerCostValue = localStorage.getItem('clickerCost');

    if (multiValue) {
      this.multi = Number(multiValue);
    }

    if (costValue) {
      this.cost = Number(costValue);
    }
    if (clcikersValue){
      this.clickers = Number(clcikersValue);
    }
    if(clickerCostValue){
      this.clickersCost = Number(clickerCostValue);
    }
    setInterval(() => { this.updateCount() }, 1 * 1000);
  }


  ngOnInit(): void {
    if (this.shouldPlay) {
      this.audio.volume = 0.5;
      this.audio.play();
    }
  }

  ngOnDestroy(): void {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  changeRoute() {
    this.router.navigate(["High Low Bet"])
  }

  async countClick() {

    if (!this.isClicked) {
      const mainButton = document.getElementById('mainButton');
      const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink',
        'teal', 'gold', 'maroon', 'navy', 'crimson', 'lime', 'magenta', 'skyblue', 'salmon', 'olive', 'turquoise'];
      this.isClicked = true;

      const intervalId = setInterval(() => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        mainButton!.style.backgroundColor = randomColor;
      }, 80);


      for (let i = 0; i < 10; i++) {
        this.randNum = Math.floor(Math.random() * 100) * this.multi;
        await this.delay(100);
      }

      clearInterval(intervalId);

      this.allNumbers.totalPoints += this.randNum;
      this.isClicked = false;
    }
  }
  buyMultiplier() {
    if (this.allNumbers.totalPoints >= this.cost) {
      this.allNumbers.totalPoints -= this.cost;
      this.multi++;
      this.cost *= (this.cost / 20);
      localStorage.setItem('multi', String(this.multi));
      localStorage.setItem('cost', String(this.cost));
      this.allNumbers.playerName = '';
    }
  }
  updateCount() {
    this.allNumbers.totalPoints += (Math.floor(Math.random() * 100) * this.clickers) * this.multi;
    //console.log((1 * this.clickers) * this.multi)
  }
  buyClicker() {
    if (this.allNumbers.totalPoints >= this.clickersCost) {
      this.clickers++;
      this.allNumbers.totalPoints -= this.clickersCost;
      this.clickersCost += this.clickersCost * 2;
      localStorage.setItem('clicker', String(this.clickers));
      localStorage.setItem('clickerCost', String(this.clickersCost));
    }
  }

  resetProgress(){
    this.allNumbers.totalPoints = 0;

    this.clickers = 0;
    localStorage.setItem('clicker', String(0));

    this.clickersCost = 100;
    localStorage.setItem('clickerCost', String(100));

    this.multi = 1;
    localStorage.setItem('multi', String(1));

    this.cost = 100;
    localStorage.setItem('cost', String(100));


  }


  delay(ms: number): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
  }
}
