import { Component } from '@angular/core';
import { UserService } from '../../service/login.service';
@Component({
    selector: 'login-component',
    templateUrl: './login.component.html'
})
export class LoginComponent { 
    userSignIn : any={};
    constructor(private userService: UserService) { }

    SignIn(){
        this.userService.signIn(this.userSignIn).then((result)=> {
            console.log('login success');
        }, (err)=>{
            console.log(err);
        });
    }
}