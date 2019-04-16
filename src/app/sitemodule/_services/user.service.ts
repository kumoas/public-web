import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions, Response } from "@angular/http";

import { User } from "../_models/index";

@Injectable()
export class UserService {
    constructor(private http: Http) {
    }
    // We are not using verify API
    // verify() {
    //     return this.http.get('/api/verify', this.jwt()).map((response: Response) => response.json());
    // }

    forgotPassword(email: string) {
        return this.http.post('/private/reset_passwords', JSON.stringify({ email }), this.jwt()).map((response: Response) => response.json());
    }

    resetPassword(token: string, password: string, password_confirmation: string) {
        return this.http.put('/private/reset_passwords', JSON.stringify({ token, password, password_confirmation }), this.jwt()).map((response: Response) => response.json());
    }

    // We are not using getAll API
    // getAll() {
    //     return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
    // }

    // We are not using getById API
    // getById(id: number) {
    //     return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    // }

    signup(user: User) {
        return this.http.post('/private/users', user, this.jwt()).map((response: Response) => response.json());
    }

    confirm(user: User) {
        return this.http.post('/private/users/confirm', user, this.jwt()).map((response: Response) => response.json());
    }

    // We are not using getById API
    // update(user: User) {
    //     return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    // }

    // We are not using delete API
    // delete(id: number) {
    //     return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    // }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let user = JSON.parse(localStorage.getItem('user'));
        let token = JSON.parse(localStorage.getItem('token'));
        if (user && token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + token });
            return new RequestOptions({ headers: headers });
        } else {
            return new RequestOptions();
        }
    }
}
