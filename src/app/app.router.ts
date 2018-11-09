import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfilComponent } from './pages/dashboard/profil/profil.component';
import { HomeComponent } from './pages/dashboard/home/home.component';
import { MyActivityComponent } from './pages/dashboard/my-activity/my-activity.component';
import { ValidActivityComponent } from './pages/dashboard/valid-activity/valid-activity.component';
import { ForgetsPasswordComponent } from './pages/forgets/forgets.pw.components';
import { JwtInterceptor } from './pages/_helpers/jwt.interceptor';
import { ErrorInterceptor } from './pages/_helpers/error.interceptor';
import { AuthenticationService } from './pages/_services/authentication.service';
import { SettingsComponent } from './pages/dashboard/settings/settings.component';
import { UserManagementComponent } from './pages/dashboard/user-management/user-management.component';
import { LoginComponent } from './pages/login/login.component';
import { PwdresetComponent } from './pages/pwdreset/pwdreset.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'pwdreset/:code', component: PwdresetComponent},
  { path: 'login', component: LoginComponent },
  { path: 'login/forgetsPassword', component: ForgetsPasswordComponent },
  { path: '**', redirectTo: 'login' },
  { path: 'pwdreset/:code', component: PwdresetComponent},
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthenticationService],
    children: [
      { path: 'profil', component: ProfilComponent },
      { path: 'home', component: HomeComponent },
      { path: 'myactivite', component: MyActivityComponent },
      { path: 'validActivity', component: ValidActivityComponent },
      { path: 'setting', component: SettingsComponent },
      { path: 'user-management', component: UserManagementComponent }
    ]
  },

];

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})
export class AppRoutingModule { }


