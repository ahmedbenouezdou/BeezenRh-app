import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Activity } from "../_models/activity";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class ActivityService extends BehaviorSubject<Activity[]> { 
    
  
    private url: string = environment.API_ENDPOINT + "/activity"

    constructor(private router: Router, private http: HttpClient) {
        super([]);
    }

    getAll() {
        return this.http.get<Activity[]>(this.url + '/getall');
    }

    getByValid(valid:boolean) : Observable<Activity[]>{
        return this.http.get<Activity[]>(this.url + '/getallvalid/'+valid);
    }

    saveActivity(activity:Activity, isNew?: boolean) : Observable<Activity> {
        return this.http.put<Activity>(this.url, activity);
    }

    getActivityById(id: number): Observable<Activity> {
        return this.http.get<Activity>(this.url + "/getActivityParId?id=" + id)
    }
}