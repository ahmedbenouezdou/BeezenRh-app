import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Md5} from "md5-typescript";


@Injectable({ providedIn: 'root' })
export class ForgetsPasswordService {
    constructor(private http: HttpClient) { }

 

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
    
}
