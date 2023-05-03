import { Component } from '@angular/core';
import { AllNumbers } from '../allNumbers.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-forum',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  name: string = ''
  color: string = '';

  constructor(private allNumbers: AllNumbers, private route: Router){}



  onSubmit() {
    
    this.allNumbers.playerName = this.name;
    this.allNumbers.color = this.color;
    this.route.navigate(['Home']);
  }

}
