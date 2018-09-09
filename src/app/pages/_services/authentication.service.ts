import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Md5} from "md5-typescript";

import { User } from '../_models';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        var headers_object = new HttpHeaders();
        const options = new HttpParams();
        console.log(Md5.init(password));
        headers_object.append('Content-Type', 'application/json');

        return this.http.post<any>(`http://localhost:8082/getToken`, {'username':username,'password':Md5.init(password)})
            .pipe(map(dataToken => {
                // login successful if there's a jwt token in the response
                if (dataToken && dataToken.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(dataToken));
                    localStorage.setItem('infoUser', JSON.stringify({nom:dataToken.nom, prenom:dataToken.prenom, id:dataToken.role,role:dataToken.role }));

                }

                return dataToken;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
    
}
