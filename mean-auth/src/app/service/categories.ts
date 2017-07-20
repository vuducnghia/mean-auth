import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, RequestOptions, Headers } from '@angular/http';
import { UserService } from './login.service';

@Injectable()
export class CategoriesService {
    constructor(
        private http: Http,
        private userService: UserService
    ) { }
    getAllCategories() {
        return new Promise((resolve, reject) => {
            this.http.get('/categories/categories')
                .map(res => res.json())
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

    saveCategories(data) {
        let headers = new Headers({ 'Authorization': this.userService.token });
        let options = new RequestOptions({ headers: headers });
        return new Promise((resolve, reject) => {
            this.http.post('/categories/categories', data, options)
                .map(res => res.json())
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        })
    }

    deleteCategories(id) {
        let headers = new Headers({ 'Authorization': this.userService.token });
        let options = new RequestOptions({ headers: headers });
        return new Promise((resolve, reject) => {
            this.http.delete('/categories/' + id, options)
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                })
        })
    }
}