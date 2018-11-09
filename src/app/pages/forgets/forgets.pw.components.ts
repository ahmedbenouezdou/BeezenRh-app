import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { ConfigLogin } from '../login/login';
import { ForgetsPasswordService } from './forgets.pw.service';
import { AuthenticationService } from '../_services/authentication.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-forgets',
  templateUrl: './forgets.pw.component.html',
  styleUrls: ['./forgets.pw.component.scss']
})


export class ForgetsPasswordComponent implements OnInit {

  loginModel = new ConfigLogin();
  loading = false;
  submitted = false;
  returnUrl: string;
  error = false;
  showOK = false;
  constructor(private translateService: TranslateService,public toastr: ToastrManager,
    private authentificationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }


  onSubmit() {
    this.authentificationService.forgotPassword(this.loginModel.email).subscribe(() => {
      this.router.navigate(["/login"]);
      this.toastr.successToastr(this.translateService.instant('message.info.mail.ok'));
    
  } , (err) => {
    this.toastr.errorToastr(this.translateService.instant(err));
   })  
  
  }



}
