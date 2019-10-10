import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CookieService } from 'angular2-cookie/services/cookies.service';
@Component({
    selector: "kumo-site-subscription",
    templateUrl: './saas-subscription.component.html',
    styleUrls: ['./saas-subscription.component.scss']
})

export class SaasSubscriptionComponent implements OnInit {

    constructor(private _router: Router,
        private _route: ActivatedRoute,
        private cookieService: CookieService) {

    }

    ngOnInit() {
        var self = this;
        var registrationToken = self._route.snapshot.queryParams["registration_token"];
        var domainName = window.location.hostname;
        self.cookieService.put('registrationToken', registrationToken, {domain: domainName});
        if(domainName == 'kumolus.com')
           self.cookieService.put('registrationToken', registrationToken, {domain: 'kumolus.net'}); 
        var subdomain = self.cookieService.get('subdomain');
        if(subdomain){
            var url = window.location.host;
            var environment = url.split(".")[0];
            url.replace(environment,subdomain);
            self.cookieService.remove('subdomain');
            window.location.href = url;
        }
        else{
            self._router.navigate(['workspace']); 
        }
    }
}