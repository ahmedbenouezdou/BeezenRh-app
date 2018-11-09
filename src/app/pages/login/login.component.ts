import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { ConfigLogin } from './login';
import { AuthenticationService } from '../_services/authentication.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
    loginModel = new ConfigLogin();
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';


    constructor(private translateService: TranslateService,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService, public toastr: ToastrManager, vcr: ViewContainerRef) { }


    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = '/dashboard/home';
    }


    onSubmit() {
        this.submitted = true;
        this.loading = true;
        this.authenticationService.login(this.loginModel.username, this.loginModel.password)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.toastr.errorToastr(this.translateService.instant('login.error'), this.translateService.instant('notification.error'));
                    this.error = error;
                    this.loading = false;
                });
    }




}
