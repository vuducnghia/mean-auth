import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../service/login.service';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { HomeRoute } from './home.route';
import { FormsModule } from '@angular/forms';
import { SignUpComponent } from './signup/signup.component';
const StageRouter=[
  ...HomeRoute
]
@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forRoot(StageRouter)
  ],
  declarations: [
    LoginComponent, 
    SignUpComponent
  ],
  providers:[
    UserService
  ]
})
export class HomeRouteModule { }
