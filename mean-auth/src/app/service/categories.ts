import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';

@Injectable()
export class CategoriesService {
    constructor(private http: Http) {
    }
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
        return new Promise((resolve, reject) => {
            this.http.post('/categories/categories', data)
                .map(res => res.json())
                .subscribe(res => {
                    console.log('service api/categories');
                    resolve(res);
                }, (err) => {
                    console.log('err : service api/categories');
                    reject(err);
                });
        })
    }
}