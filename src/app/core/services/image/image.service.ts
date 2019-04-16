import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';
import { StorageSync, StorageStrategy } from 'angular2-storage-sync';
import { Helpers } from "../../helpers/helpers";

import 'rxjs/add/operator/toPromise';
import * as _ from 'underscore';


@Injectable()

export class ImageService {
    //@StorageSync('kumolus_adapters') adapterData = [];
    constructor(private http: Http) {

    }

    private headers = new Headers({ 'Content-Type': 'application/json' });

    getImage(url: string): Promise<any> {
        let self = this;
        return this.http.get(url)
            .toPromise()
            .then(response => {
                return response;
            })
            .catch(this.handleError);

    }


    private extractData(res) {
        let body = res.json();
        return body || [];
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        error.data = error.json();
        return Promise.reject(error || error);
    }

}