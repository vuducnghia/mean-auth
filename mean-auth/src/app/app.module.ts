import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Route, Routes } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarRouteModule } from './navbar/navbar.module';
import { HomeRouteModule } from './home/home.module';


// const appRoutes : Routes=[
//   { path: '', redirectTo: 'home', pathMatch: 'full' },
//   { path: 'home', component: NavbarComponent },
// ]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    RouterModule,
    //
    NavbarRouteModule,
    HomeRouteModule
    // RouterModule.forRoot(appRoutes)
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
