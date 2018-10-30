import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Md5} from "md5-typescript";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class AuthenticationService implements CanActivate {
    private url: string = environment.API_ENDPOINT + "/login"
    constructor(private http: HttpClient,private router: Router) { }

    login(username: string, password: string) {
        const options = new HttpParams();
        return this.http.post<any>(this.url, {'username':username,'password':/* Md5.init */(password)})
            .pipe(map(dataToken => {
                // login successful if there's a jwt token in the response
                if (dataToken && dataToken.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(dataToken));
                    localStorage.setItem('infoUser', JSON.stringify({nom:dataToken.nom, prenom:dataToken.prenom, id:dataToken.id,role:dataToken.role }));
                    sessionStorage.setItem('id',dataToken.id);
                }

                return dataToken;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
    
}
