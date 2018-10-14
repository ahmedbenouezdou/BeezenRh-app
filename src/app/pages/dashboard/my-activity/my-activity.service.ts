import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class MyActivityService {
    configUrl = './dashboard/my-activity/my-activity.json';

    constructor(private http: HttpClient) { }

    getConfigModule() {
        return this.http.get(this.configUrl);
        }
}
