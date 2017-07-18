import { NgModule, Component } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { NavbarComponent } from './navbar.component';

export const NavbarRouter: Route = {
    path: '',
    component: NavbarComponent,
    outlet: 'navbar'
}
@NgModule({
    imports: [
        RouterModule.forRoot([NavbarRouter])
    ]
})
export class NavbarRouteModule { }