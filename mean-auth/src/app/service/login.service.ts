import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';

@Injectable()
export class UserService {
    public token: string;
    username: string;
    constructor(private http: Http) { }
    signUp(data) {
        return new Promise((resolve, reject) => {
            this.http.post('/api/signup', data)
                .map(res => res.json())
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }
    signIn(data) {
        return new Promise((resolve, reject) => {
            this.http.post('/api/login', data)
                .map(res => res.json())
                .subscribe(res => {
                    this.token = res.token;
                    // console.log(res);
                    this.username = res.username;
                    console.log(res.username);
                    // console.log(res.token);
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: this.username, token: this.token }));
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }
    LogOut() { // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}