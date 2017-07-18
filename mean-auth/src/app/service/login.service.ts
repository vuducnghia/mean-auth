import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';

@Injectable()
export class UserService {
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
    signIn(data){
        return new Promise((resolve, reject)=>{
            this.http.post('/api/login', data)
                .map(res=>res.json())
                .subscribe(res=>{
                    resolve(res);
                }, (err)=>{
                    reject(err);
                });
        });
    }
}