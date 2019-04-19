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
        let subdomain = this.model.subdomain;
        this._authService.validateSubdomain(subdomain).then(response => {
            if (response.status) {
                localStorage.setItem('allowed_url', response.url);
                window.location.href = response.url;
            } else {
                this.flashMessageService.show("Workspace doesn't exist", { cssClass: 'alert-danger', timeout: 1000000 });
            }
        }, function (error) {
            let errMsg = JSON.parse(error._body);
            this.flashMessageService.show(errMsg.message, { cssClass: 'alert-danger', timeout: 10000 });
            this._alertService.error(error.message);
            this.loading = false;
        });

    }

}