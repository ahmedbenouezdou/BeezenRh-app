import { Component, OnInit, forwardRef } from '@angular/core';
import { FormGroup, FormControl, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { Address } from '../../_models/address';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { TranslateService } from '@ngx-translate/core';

var formGroup1 = (adresse: Address) => new FormGroup({
  "streetAddress": new FormControl(adresse.streetAddress),
  "city": new FormControl(adresse.city),
  "country": new FormControl(adresse.country),
  "postalCode": new FormControl(adresse.postalCode),
});

var formGroup = (utilisateur: User) => new FormGroup({
  "username": new FormControl(utilisateur.username/* ,Validators.required */),
  "password": new FormControl(utilisateur.password),
  "firstName": new FormControl(utilisateur.firstName),
  "lastName": new FormControl(utilisateur.lastName),
  "email": new FormControl(utilisateur.email),
  "numtel": new FormControl(utilisateur.numtel),
  "codereset": new FormControl(utilisateur.codereset),
  "datereset": new FormControl(utilisateur.datereset),
  "address": new FormControl(utilisateur.address.city),
  "about": new FormControl(utilisateur.about),
  "post": new FormControl(utilisateur.post),
  "facebookLink": new FormControl(utilisateur.facebookLink),
  "likendinLink": new FormControl(utilisateur.likendinLink),
  "googleplusLink": new FormControl(utilisateur.googleplusLink)
})

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})


export class ProfilComponent implements OnInit {

  private user: User;
  profilForm: FormGroup = formGroup({
    "id": 0,
    "username": "",
    "password": "",
    "firstName": "",
    "lastName": "",
    "email": "",
    "numtel": 0,
    "codereset": 0,
    "datereset": new Date(),
    "company": "",
    "address": new Address(),
    "about": "",
    "post": "",
    "facebookLink": "",
    "likendinLink": "",
    "googleplusLink": ""
  });
  addressForm: FormGroup = formGroup1({
    "id": 0,
    "streetAddress": "",
    "city": "",
    "country": "",
    "postalCode": 0,
  });
  constructor(private UtilisateurService: UserService,private translateService:TranslateService, private router: Router,public toastr: ToastrManager) { }

  ngOnInit() {
    this.UtilisateurService.getUtilisateurById(+sessionStorage.getItem('id')).subscribe((user) => {
      this.user = user;
      console.log(user.address.city)
      this.profilForm.reset(this.user);
      this.addressForm.reset(this.user.address);
      console.log(this.profilForm.value.address.city)
    })
  }

  save() {
    console.log("save profil clicked",this.profilForm.value)
    this.profilForm.value.address=this.addressForm.value;
    this.UtilisateurService.saveUtilisateur(this.profilForm.value).subscribe((utilisateur) => {
    this.toastr.successToastr(this.translateService.instant('message.save.success'), this.translateService.instant('notification.success'));
    },(error)=>{
      this.toastr.errorToastr(this.translateService.instant('message.save.error'),this.translateService.instant('notification.error'));
    }
    );
  
  }

  goToFacebook() {
    window.location.href = this.profilForm.value.facebookLink;
  }

  goToLinkedin() {
    window.location.href = this.profilForm.value.likendinLink;
  }

  goToGplus() {
    window.location.href = this.profilForm.value.googleplusLink;
  }
}
