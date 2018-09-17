import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { ConfigLogin } from '../login/login';

@Component({
  selector: 'app-forgets',
  templateUrl: './forgets.pw.component.html',
  styleUrls: ['./forgets.pw.component.css']
})




export class ForgetsPasswordComponent implements OnInit {
 
    loginModel = new ConfigLogin();
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
  constructor() {}

  ngOnInit() {

    
  }





}
