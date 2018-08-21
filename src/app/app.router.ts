import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfilComponent } from './pages/dashboard/profil/profil.component';
import { HomeComponent } from './pages/dashboard/home/home.component';
import { MyActivityComponent } from './pages/dashboard/my-activity/my-activity.component';
import { ValidActivityComponent } from './pages/dashboard/valid-activity/valid-activity.component';

const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
        { path: 'profil', component: ProfilComponent },
        { path: 'home', component: HomeComponent },
        { path: 'myactivite', component: MyActivityComponent },
        { path: 'validActivity', component: ValidActivityComponent }

    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
  ,
  { path: '',   redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [

  ]
})
export class AppRoutingModule { }


