import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class ForgetsPasswordService {
    constructor(private http: HttpClient) { }

 
    sendInitPassword(username: string) {
        const options = new HttpParams();
        return this.http.post<any>(`http://localhost:8082/forgotPassword`, {'username':username})
            .pipe(map(dataToken => {
                return dataToken;
            }));
    }

    
}
