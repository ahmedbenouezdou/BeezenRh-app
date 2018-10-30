import { Routes, RouterModule } from "@angular/router";
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DashboardComponent } from "./dashboard.component";
import { ProfilComponent } from "./profil/profil.component";
import { HomeComponent } from "./home/home.component";
import { ValidActivityComponent } from "./valid-activity/valid-activity.component";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AuthenticationService } from "../_services/authentication.service";
import { MyActivityComponent } from "./my-activity/my-activity.component";
import { SettingsComponent } from "./settings/settings.component";
import { UserManagementComponent } from "./user-management/user-management.component";



export const dashboardRoute: Routes = [
    {
        path: 'dashboard', component: DashboardComponent,
        canActivate: [AuthenticationService],
        children: [
            { path: 'profil', component: ProfilComponent },
            { path: 'home', component: HomeComponent },
            { path: 'myactivite', component: MyActivityComponent },
            { path: 'validActivity', component: ValidActivityComponent },
            { path: 'setting', component: SettingsComponent },
            { path: 'user-management', component: UserManagementComponent }
        ]
    }]

    export function HttpLoaderFactory(http: HttpClient) {
        return new TranslateHttpLoader(http, './assets/i18n/', '.json');
      }
@NgModule({
    imports: [RouterModule.forChild(dashboardRoute), FormsModule, 
        ReactiveFormsModule ,
        NgbModule, BrowserModule, 
        TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
            }
          }),],
    exports: [RouterModule],
    declarations: [ProfilComponent, HomeComponent, MyActivityComponent, ValidActivityComponent, SettingsComponent, UserManagementComponent]
})
export class DashboardModule { }