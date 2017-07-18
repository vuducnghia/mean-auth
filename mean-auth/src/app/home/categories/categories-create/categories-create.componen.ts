import { Component } from '@angular/core';
import { CategoriesService } from '../../../service/categories';
@Component({
    selector: 'CategoriesCreate',
    templateUrl: './categories-create.component.html'
})
export class CategoriesCreateComponent {
    categories: any={};
    constructor(private categoriesService: CategoriesService) { }

    Save() {
        this.categoriesService.saveCategories(this.categories).then((result) => {
            console.log('login success');
        }, (err) => {
            console.log(err);
        })
    }
}