import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class UserService extends BehaviorSubject<User[]> {




    private data: User[] = [];
    private url: string = environment.API_ENDPOINT + "/utilisateurs"
    public admin: boolean = false
    static httpc: HttpClient

    constructor(private router: Router, private http: HttpClient) {
        super([]);
        UserService.httpc = http;
    }
    getAll() {
        return this.http.get<User[]>(this.url + '/getAll');
    }

    getUtilisateurByEmail(email: String) {

        return this.http.get<User>(this.url + "/getUtilisateurParEmail?email=" + email);

    }
    getUtilisateurById(id: number): Observable<User> {
        return this.http.get<User>(this.url + "/getUtilisateurParId?id=" + id)
    }

    saveUtilisateur(utilisateur, isNew?: boolean) : Observable<User> {

        return this.http.post<User>(this.url, utilisateur);
    }
}
