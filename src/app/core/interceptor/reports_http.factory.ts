import { XHRBackend, Http, RequestOptions } from "@angular/http";
import { InterceptedReportHttp } from "./reports_http.interceptor";

export function ReportsHttpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
    return new InterceptedReportHttp(xhrBackend, requestOptions);
}