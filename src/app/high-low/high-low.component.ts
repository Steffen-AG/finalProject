import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-high-low',
  templateUrl: './high-low.component.html',
  styleUrls: ['./high-low.component.css']
})
export class HighLowComponent {

  constructor(private route: Router) {}

  changeRoute(){
    this.route.navigate(["Home"])
  }

}
