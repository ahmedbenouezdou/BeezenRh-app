import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app.router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfilComponent } from './pages/dashboard/profil/profil.component';
import { HomeComponent } from './pages/dashboard/home/home.component';
import { MyActivityComponent } from './pages/dashboard/my-activity/my-activity.component';
import { ValidActivityComponent } from './pages/dashboard/valid-activity/valid-activity.component';

import { JwtInterceptor, ErrorInterceptor } from './pages/_helpers';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    ProfilComponent,
    HomeComponent,
    MyActivityComponent,
    ValidActivityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(router: Router) {
  }
 }
