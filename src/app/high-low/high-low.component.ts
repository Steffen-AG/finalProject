import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllNumbers } from '../allNumbers.service';

@Component({
  selector: 'app-high-low',
  templateUrl: './high-low.component.html',
  styleUrls: ['./high-low.component.css']
})
export class HighLowComponent implements OnInit, OnDestroy {

  public inProgress: boolean;
  public betAmount: number;
  public randomNumber: number;
  public roundCounter: number;
  public lost: boolean;
  public cashOut: boolean;
  public shouldPlay: boolean;
  private audio: HTMLAudioElement;

  constructor(private route: Router, private allNumbers: AllNumbers) {
    this.shouldPlay = true;
    this.audio = new Audio('../../assets/Ape Escape Soundtrack - 16 - Oceana  Crabby Beach.mp3');
    this.audio.loop = true;
    this.cashOut = false;
    this.inProgress = false;
    this.lost = false;
    this.betAmount = 0;
    this.randomNumber = 5;
    this.roundCounter = 1;
    this.allNumbers.muteOb.subscribe((mute: boolean) => {
      if (mute) {
        this.audio.volume = 0;
        this.shouldPlay = mute;
      } else {
        this.audio.volume = 0.5;
        this.shouldPlay = mute;
      }
    });
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

  async startGame() {
    if (this.betAmount != 0 && this.betAmount <= this.allNumbers.totalPoints && this.betAmount > 0) {
      this.inProgress = true;
      this.allNumbers.totalPoints -= this.betAmount;

      while (!this.lost && this.roundCounter < 11 && !this.cashOut) {
        const buttonClicked = await this.waitForButtonClick();
        console.log(buttonClicked)
        if (buttonClicked === 'cashOut') {
          this.cashOut = true;
        } else {
          const oldRandom = this.randomNumber;
          for (let i = 0; i < 10; i++) {
            this.randomNumber = Math.floor(Math.random() * 10) + 1;
            await this.delay(100);
          }
          //console.log('round number: ' + this.roundCounter + ' old random = ' + oldRandom);
          //console.log('new number = ' + this.randomNumber);
          if (buttonClicked === 'higher' && this.randomNumber >= oldRandom) {
            this.roundCounter++;
          } else if (buttonClicked === 'lower' && this.randomNumber < oldRandom) {
            this.roundCounter++;
          } else {
            this.lost = true;
            document.getElementById('game')!.style.backgroundColor = 'red';
            await this.delay(1000);
            document.getElementById('game')!.style.backgroundColor = 'transparent';
          }
          
        }
        //console.log('lost: ' + this.lost);
        //console.log('round counter: ' + this.roundCounter);
        //console.log('cash out: ' + this.cashOut);
      }
      if (!this.lost) {
        this.allNumbers.totalPoints += this.betAmount * this.roundCounter;
      }
      this.randomNumber = 5;
      this.inProgress = false;
      this.roundCounter = 1;
      this.cashOut = false;
      this.lost = false;
    } else {
      if (this.betAmount <= 0) {
        window.alert('Please bet some money!');
      } else if (this.betAmount > this.allNumbers.totalPoints) {
        window.alert('You are too poor for this bet!');
      }
    }

  }

  delay(ms: number): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
  }

  async waitForButtonClick() {
    const button1Promise = new Promise(resolve => {
      document.getElementById('higherButton')!.addEventListener('click', () => {
        resolve('higher');
      });
    });

    const button2Promise = new Promise(resolve => {
      document.getElementById('lowerButton')!.addEventListener('click', () => {
        resolve('lower');
      });
    });

    const button3Promise = new Promise(resolve => {
      document.getElementById('cashOut')!.addEventListener('click', () => {
        resolve('cashOut');
      });
    });

    return Promise.race([button1Promise, button2Promise, button3Promise]);
  }

}
