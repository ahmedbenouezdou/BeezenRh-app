import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginModel: {};

  constructor(private router: Router) { }

  ngOnInit() {
    this.loginModel = {
      login: '',
      password: ''
    };
  }

  login(): void {
    this.router.navigate(['dashboard/home']);
  }
}
