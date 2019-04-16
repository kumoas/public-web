import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";

import { NgxRolesService, NgxPermissionsService } from 'ngx-permissions';

@Injectable()
export class AuthenticationService {

    constructor(private http: Http, private ngxRolesService: NgxRolesService, private ngxPermissionsService: NgxPermissionsService) {
    }

    validateSubdomain(subdoamin: String){
        return this.http.get('private/users/validate_subdomain?subdomain='+subdoamin)
        .toPromise()
        .then(response => {
            return response.json() || {};
        })
    }
}
