import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";

import { User } from "../_models/index";

@Injectable()
export class AuthenticationService {
    hosted_zone: any;

    constructor(private http: Http) {
    }
    
    setHostedZone(region){
        this.hosted_zone = region;
        localStorage.setItem('hosted_region',this.hosted_zone)
    }
    getHostedZone(){
        return this.hosted_zone;
    }
    validateSubdomain(params){
        if(params.subdomain && params.username_or_email){
            var url = 'private/users/validate_subdomain?subdomain='+params.subdomain+'&username_or_email='+params.username_or_email;
        }
        else{
            if(params.subdomain)
            var url = 'private/users/validate_subdomain?subdomain='+params.subdomain;
            else
            var url = 'private/users/validate_subdomain?username_or_email='+params.username_or_email;
        }
        return this.http.get(url)
        .toPromise()
        .then(response => {
            return response.json() || {};
        })
    }

    signup(user: User) {
        return this.http.post('/private/users', user).map((response: Response) => response.json());
    }

    confirm(user: User) {
        return this.http.post('/private/users/confirm', user).map((response: Response) => response.json());
    }
}
