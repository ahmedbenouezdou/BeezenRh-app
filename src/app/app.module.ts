import { BrowserModule } from '@angular/platform-browser';
import { NgModule, forwardRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AppRoutingModule } from './app.router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { ForgetsPasswordComponent } from './pages/forgets/forgets.pw.components';
import { FirstConnectionComponent } from './pages/login/first-connection/first-connection.component';
import { JwtInterceptor } from './pages/_helpers/jwt.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AuthenticationService } from './pages/_services/authentication.service';
import { UserService } from './pages/_services/user.service';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { LoginComponent } from './pages/login/login.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ng6-toastr-notifications';
 
    

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    ForgetsPasswordComponent,
    FirstConnectionComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, ToastrModule.forRoot(),
    DashboardModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [AuthenticationService,UserService/* ,RolesService */,JwtInterceptor
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(router: Router) {
  }
 }
