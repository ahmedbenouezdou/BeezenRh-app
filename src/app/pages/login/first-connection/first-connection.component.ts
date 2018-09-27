import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { ConfigLogin } from '../login';

@Component({
  selector: 'app-first-connection',
  templateUrl: './first-connection.component.html',
  styleUrls: ['./first-connection.component.css']
})
export class FirstConnectionComponent implements OnInit {

  loginModel = new ConfigLogin();
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
      private route: ActivatedRoute,
      private router: Router) {}

  ngOnInit() {

      // reset login status
      // get return url from route parameters or default to '/'
      this.returnUrl =  '/dashboard/home';
  }



  onSubmit() {
   this.submitted = true;
        this.loading = true;
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
