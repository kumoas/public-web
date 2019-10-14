import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
    selector: "kumo-site-subscription",
    templateUrl: './saas-subscription.component.html',
    styleUrls: ['./saas-subscription.component.scss']
})

export class SaasSubscriptionComponent implements OnInit {

    constructor(private _router: Router,
        private _route: ActivatedRoute) {

    }

    ngOnInit() {
        var self = this;
        var registrationToken = self._route.snapshot.queryParams["registration_token"];
        var str = window.location.hostname;
        var domain = str.split(".", 1);
        var domainName = str.replace(domain[0] + '.',"");
        if(domainName == 'kumolus.com')
           document.cookie = "registrationToken=" + registrationToken + ";domain=" + 'kumolus.net';
       else
        document.cookie = "registrationToken=" + registrationToken + ";domain=" + domainName;

        var subdomain = self.getCookie('subdomain');
        if(subdomain){
            var url = window.location.host;
            var environment = url.split(".")[0];
            var extensions = url.split(".")[2];
            url = url.replace(environment,subdomain);
            if(extensions == 'com')
                url = url.replace(extensions,'net');
            self.deleteCookie('subdomain');
            window.location.href = url;
        }
        else{
            self._router.navigate(['workspace']); 
        }
    }
    getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }
       deleteCookie(name) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };
}