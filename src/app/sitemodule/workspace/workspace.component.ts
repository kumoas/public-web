import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { AuthenticationService } from "../_services/authentication.service";
import { AlertService } from "../_services/alert.service";
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
    selector: "kumo-site-workspace",
    templateUrl: './workspace.component.html',
    styleUrls: ['./workspace.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class WorkspaceComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    @ViewChild('alertSignin', { read: ViewContainerRef }) alertSignin: ViewContainerRef;

    constructor(private _router: Router,
        private _route: ActivatedRoute,
        private _authService: AuthenticationService,
        private _alertService: AlertService,
        private flashMessageService: FlashMessagesService,
        private cfr: ComponentFactoryResolver) {
    }

    ngOnInit() {
    }

    onSubmit(form) {
        var self = this;
        var params = {
            subdomain : self.model.subdomain,
            username_or_email: self.model.username_or_email
        }
        self._authService.validateSubdomain(params).then(response => {
            if (response.status) {
                localStorage.setItem('allowed_url', response.url);
                window.location.href = response.url;
            } else {
                self.flashMessageService.show("Workspace doesn't exist", { cssClass: 'alert-danger', timeout: 10000 });
            }
        }, function (error) {
            let errMsg = JSON.parse(error._body);
            self.flashMessageService.show(errMsg.message, { cssClass: 'alert-danger', timeout: 10000 });
            self._alertService.error(error.message);
            self.loading = false;
        });

    }

}