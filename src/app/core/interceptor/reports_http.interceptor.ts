import { Injectable } from "@angular/core";
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { ConfigurationService } from './../services/configuration';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const REPORTURL = ConfigurationService.getVar('REPORT_API_URL');

@Injectable()
export class InterceptedReportHttp extends Http {
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options)
        .map((response: Response) => {
            let token = response.headers.get('authorization');
            localStorage.setItem('token', JSON.stringify(token));

            return response;
        })
        .catch((error: Response) => {
            if ((error.status === 401) && (window.location.href.match(/\?/g) || []).length < 2) {
                console.log('The authentication session expires or the user is not authorised.');
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                // window.location.href = window.location.hostname + ':' + window.location.port + '/auth/login';
            }
            return Observable.throw(error);
        });
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.get(url, this.getRequestOptionArgs(options));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.post(url, body, this.getRequestOptionArgs(options));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.put(url, body, this.getRequestOptionArgs(options));
    }

    patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.patch(url, body, this.getRequestOptionArgs(options));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.delete(url, this.getRequestOptionArgs(options));
    }

    private updateUrl(req: string) {
        return (REPORTURL + req);
    }

    private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

        let user = JSON.parse(localStorage.getItem('user'));
        let token = JSON.parse(localStorage.getItem('token'));

        if (user && token) {
           options.headers.append('Authorization', 'Bearer ' + token);
        }

        return options;
    }
}
