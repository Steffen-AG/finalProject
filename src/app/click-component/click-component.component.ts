import { Component } from '@angular/core';

@Component({
  selector: 'app-click-component',
  templateUrl: './click-component.component.html',
  styleUrls: ['./click-component.component.css']
})
export class ClickComponentComponent {
  public counter: number;
  public multi: number;
  public cost: number;
  public clickers: number;
  public randNum: number;
  public clickersCost: number;
  private isClicked: boolean;
  

  constructor(){
    this.counter = 0;
    this.multi = 1;
    this.cost = 100;
    this.clickers = 0;
    this.clickersCost = 100;
    this.randNum = 0;
    this.isClicked = false;
    setInterval(()=> { this.updateCount() }, 1 * 1000);
  }

  async countClick(){
    if(!this.isClicked){
      const mainButton = document.getElementById('mainButton');
      const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink',
       'teal', 'gold', 'maroon', 'navy', 'crimson', 'lime', 'magenta', 'skyblue', 'salmon', 'olive', 'turquoise'];
      this.isClicked = true;

      const intervalId = setInterval(() => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        mainButton!.style.backgroundColor = randomColor;
      }, 80);


      for(let i = 0; i < 10; i++){
        this.randNum = Math.floor(Math.random() * 100) * this.multi;
        await this.delay(100);
    }

    clearInterval(intervalId);

    this.counter += this.randNum;
    this.isClicked = false;
    }
  }
  buyMultiplier(){
    if(this.counter >= this.cost){
      this.counter -= this.cost;
      this.multi++;
      this.cost *= (this.cost / 20);
    }
  }
  updateCount(){
    this.counter += (Math.floor(Math.random() * 100) * this.clickers) * this.multi;
    //console.log((1 * this.clickers) * this.multi)
  }
  buyClicker(){
    if (this.counter >= this.clickersCost){
      this.clickers++;
      this.counter -= this.clickersCost;
      this.clickersCost += this.clickersCost * 2; 
    }
  }


  delay(ms: number): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
  }
}
