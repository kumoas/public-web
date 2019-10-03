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
        self.cookieService.put('registrationToken', registrationToken );
        var subdomain = self.cookieService.get('subdomain');
        if(subdomain){
            var url = subdomain + '.' + window.location.host;
            self.cookieService.remove('subdomain');
            window.location.href = url;
        }
        else{
            self._router.navigate(['workspace']); 
        }
    }
}