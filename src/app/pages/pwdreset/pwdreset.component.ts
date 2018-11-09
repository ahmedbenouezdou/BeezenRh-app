import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

const formGroup = dataItem => new FormGroup({
  'newpwd': new FormControl(dataItem.newpwd, Validators.required),
  'rnewpwd': new FormControl(dataItem.rnewpwd, Validators.required),
});

@Component({
  selector: 'app-pwdreset',
  templateUrl: './pwdreset.component.html',
  styleUrls: ['./pwdreset.component.scss']
})
export class PwdresetComponent implements OnInit {
  private code: string;
  public formGroup: FormGroup;
  private sub: Subscription;
  public opened: boolean = false;
  constructor(private router: Router, private route: ActivatedRoute,private translateService: TranslateService, private authenticationService: AuthenticationService, public toastr: ToastrManager ) { }

  ngOnInit() {
    this.formGroup = formGroup({ "newpwd": "", "rnewpwd": "" });
    //this.showTab(this.currentTab);

    this.sub = this.route.params.subscribe((param) => {
      this.code = param['code'];
      console.log(this.code);
    })

    this.authenticationService.verifyCode(this.code).subscribe(() => {
      console.log("ton code est valide");
      this.opened = true;
    }, (err) => {
      this.toastr.errorToastr(this.translateService.instant(err));
    //  console.log("ton code n'est pas valide");
      this.opened = false;
    }); 
  }


  onSubmit() {
    console.log("submitted")
  this.authenticationService.resetPassword(this.formGroup.value.newpwd, this.code).subscribe(() => {
    this.toastr.successToastr(this.translateService.instant("pwdreset.success"));
  }, (err) => {
    this.toastr.errorToastr(this.translateService.instant(err.error.message));
}) ; 
  }
}
