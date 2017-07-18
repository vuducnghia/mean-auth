import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/signup.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesCreateComponent } from './categories/categories-create/categories-create.componen';

export const HomeRoute: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'create-categories', component: CategoriesCreateComponent }
]