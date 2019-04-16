import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";

import { User } from "../_models/index";

@Injectable()
export class AuthenticationService {

    constructor(private http: Http) {
    }

    validateSubdomain(subdoamin: String){
        return this.http.get('private/users/validate_subdomain?subdomain='+subdoamin)
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
