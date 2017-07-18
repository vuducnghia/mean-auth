import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../service/categories';

@Component({
    selector: 'categories-component',
    templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit{ 
    categories:any;
    ngOnInit(): void {
        this.getCategoriesList();
    }
    constructor(private categoriesService : CategoriesService){}
    getCategoriesList(){
        this.categoriesService.getAllCategories().then((res)=>{
            this.categories = res;
        }, (err)=>{
            console.log(err);
        });
    }
}