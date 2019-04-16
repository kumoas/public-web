import { Injectable, ErrorHandler } from "@angular/core";
import { Headers, Http, RequestOptions } from "@angular/http";
import { StorageSync, StorageStrategy } from 'angular2-storage-sync';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
    @StorageSync('user') userData;

    constructor(
        private http: Http
    ) { }

    getUserData(sync = false): Promise<any> {
        let self = this;

        if (!Object.keys(self.userData).length || sync) {
            return self.http.get('user')
                .toPromise()
                .then(response => {
                    self.userData = response.json() || [];
                    return response.json() || [];
                })
                .catch(self.handleError);
        }
        return Promise.resolve(self.userData);
    };
    disable_show_intro(id){
        let self = this;
        return this.http.put('users/'+id+'/disable_intro',{})
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(this.handleError);
    }
    getAllUsers() {
        let self = this;
        return self.http.get('organisations/users')
            .toPromise()
            .then(response => {
                return response.json()._embedded.users || [];
            })
            .catch(self.handleError);
    }
    

    updateUser(id, data) : Promise<any> {
        let self = this;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.put('users/'+id, data, options)
            .toPromise()
            .then(response => {
                return self.getUserData(true);
            })
            .catch(this.handleError);
    }

    private extractData(res) {
        let body = res.json();
        return body || [];
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    request_demo(data): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('request_demo', data, options)
            .toPromise()
            .then(response => {
                return response.json().vpcs || [];
            })
            .catch(this.handleError);
    }

}