import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

   user = JSON.parse(localStorage.getItem('infoUser'));

  constructor(
    private authenticationService: AuthenticationService) {}

  ngOnInit() {
    console.log(this.user);
  }

  loginOut(){
    this.authenticationService.logout();
  }
}
