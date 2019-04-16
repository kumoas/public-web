import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';
import { Helpers } from "../../helpers/helpers";

import 'rxjs/add/operator/toPromise';

@Injectable()

export class StorageService {

    setNewService(key:any,properties:any) {
        if (properties) {
            properties = JSON.stringify(properties);
        }
        localStorage.setItem(key, properties);
    }

    getNewService<T>(key: string): T {
        let value: string = localStorage.getItem(key);

        if (value && value != "undefined" && value != "null") {
            return <T>JSON.parse(value);
        }

        return null;
    }
}