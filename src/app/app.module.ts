import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app.router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { LoginComponent } from './pages/login';
import { ProfilComponent } from './pages/dashboard/profil/profil.component';
import { HomeComponent } from './pages/dashboard/home/home.component';
import { MyActivityComponent } from './pages/dashboard/my-activity/my-activity.component';
import { ValidActivityComponent } from './pages/dashboard/valid-activity/valid-activity.component';
import { ForgetsPasswordComponent } from './pages/forgets/forgets.pw.components';
import { SettingsComponent } from './pages/dashboard/settings';
import { UserManagementComponent } from './pages/dashboard/user-management';
import { FirstConnectionComponent } from './pages/login/first-connection/first-connection.component';


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
    ValidActivityComponent,
    ForgetsPasswordComponent,
    SettingsComponent,
    UserManagementComponent,
    FirstConnectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(router: Router) {
  }
 }
