import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from './pages/_helpers';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login';
import { ProfilComponent } from './pages/dashboard/profil/profil.component';
import { HomeComponent } from './pages/dashboard/home/home.component';
import { MyActivityComponent } from './pages/dashboard/my-activity/my-activity.component';
import { ValidActivityComponent } from './pages/dashboard/valid-activity/valid-activity.component';
import { ForgetsPasswordComponent } from './pages/forgets/forgets.pw.components';
import { SettingsComponent } from './pages/dashboard/settings';
import { UserManagementComponent } from './pages/dashboard/user-management';

import { AuthGuard } from './pages/_auth';

const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
        { path: 'profil', component: ProfilComponent },
        { path: 'home', component: HomeComponent },
        { path: 'myactivite', component: MyActivityComponent },
        { path: 'validActivity', component: ValidActivityComponent },
        { path: 'setting', component: SettingsComponent },
        { path: 'user-management', component: UserManagementComponent }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'login/forgetsPassword',
    component: ForgetsPasswordComponent
  }
  ,
  { path: '',   redirectTo: '/login', pathMatch: 'full' }
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


