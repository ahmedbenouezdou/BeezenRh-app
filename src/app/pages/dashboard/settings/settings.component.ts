import { Component, OnInit } from '@angular/core';
import { ConfigLogin } from '../../login/login';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  loginModel = new ConfigLogin();

  constructor() { }

  ngOnInit() {
  }


  onSubmit() {

         /*this.authenticationService.login(this.loginModel.email, this.loginModel.password)
             .pipe(first())
             .subscribe(
                 data => {
                     this.router.navigate([this.returnUrl]);
                 },
                 error => {
                     this.error = error;
                     this.loading = false;
                 });*/
 
 
     }
}
