import { Component } from '@angular/core';
import { UserService } from '../../service/login.service';
@Component({
    selector: 'signup-component',
    templateUrl: './signup.component.html'
})
export class SignUpComponent { 
    userSignUp: any={};
    
    constructor(private userService: UserService) { }
    SignUp() {
        this.userService.signUp(this.userSignUp).then((result) => {
            console.log('signup success');
        }, (err) => {
            console.log(err);
        });
    }
}