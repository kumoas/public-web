import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { AuthenticationService } from "./../_services/authentication.service";
import { AlertService } from "../_services/alert.service";
import { AlertComponent } from "../_directives/alert.component";
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
    selector: "kumo-auth-signup",
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class SignupComponent implements OnInit {
    model: any = {
        "name": '',
        "username": '',
        "unconfirmed_email": '',
        "invite_token": '',
        "organisation_attributes": { "name": '' },
        "password": '',
        "password_confirmation": '',
        "signup_as": "normal",
    };
    loading = false;
    // TODO: Need to remove unconfirmed_email. need to solve error on build
    unconfirmed_email: any;
    inviteToken: any = '';
    signupasOptions = [{ name: 'SaaS', value: 'normal' }, { name: 'Explorer', value: 'viewer' }];
    emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    @ViewChild('alertSignup', { read: ViewContainerRef }) alertSignup: ViewContainerRef;

    constructor(private _router: Router,
        private _route: ActivatedRoute,
        private _authService: AuthenticationService,
        private _alertService: AlertService,
        private cfr: ComponentFactoryResolver,
        private flashMessagesService: FlashMessagesService) {
    }

    ngOnInit() {
        var self = this;

        self.inviteToken = self._route.snapshot.queryParams["invite"];
        self.model.invite_token = self.inviteToken;
    }

    onSubmit(form) {
        var self = this;
        this.loading = true;
        if (!form.valid) {
            this.showAlert('alertSignup');
            this._alertService.error('Please enter valid signup details.');
            this.loading = false;
        }
        this._authService.signup(this.model)
            .subscribe(
                data => {

                    this.loading = false;
                    this._router.navigate(['/workspace']);
                    if (self.model.invite_token) {
                        this.flashMessagesService.show('You can now login with the provided credentials.', { cssClass: 'alert-success', timeout: 2000 })
                    } else {
                        this.flashMessagesService.show('Thanks for signing up to Kumolus. You will receive an email, please click the link on the email to confirm your registration.', { cssClass: 'alert-success', timeout: 2000 })
                    }
                    this.model = {};
                },
                error => {
                    this.showAlert('alertSignup');
                    this._alertService.error(error);
                    this.loading = false;
                });
    }

    showAlert(target) {
        this[target].clear();
        let factory = this.cfr.resolveComponentFactory(AlertComponent);
        let ref = this[target].createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }
}