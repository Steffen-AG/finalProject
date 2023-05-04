import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClickComponent } from './click-component/click-component.component';
import { HighLowComponent } from './high-low/high-low.component';
import { UserFormComponent } from './user-form/user-form.component';


const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: 'Home', component: ClickComponent },
  { path: 'High Low Bet', component: HighLowComponent },
  { path: 'Form', component: UserFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
