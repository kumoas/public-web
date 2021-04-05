import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { AuthenticationService } from "./../_services/authentication.service";
import { AlertService } from "../_services/alert.service";
import { AlertComponent } from "../_directives/alert.component";
import { FlashMessagesService } from 'angular2-flash-messages';
declare var _ : any;
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
        "organisation_attributes": { "name": '','hosted_zone' :''},
        "password": '',
        "password_confirmation": '',
        "signup_as": "normal",
        "host_" : "",
    };
    loading = false;
    // TODO: Need to remove unconfirmed_email. need to solve error on build
    unconfirmed_email: any;
    inviteToken: any = '';
    regions = [{name:'US West (Oregon) us-west-2',code:'us-west-2'},
    {name:'Europe (Frankfurt) eu-central-1',code:'eu-central-1'},
    {name:'Asia Pacific (Sydney) ap-southeast-2',code:'ap-southeast-2'}]

    signupasOptions = [{ name: 'SaaS', value: 'normal' }, { name: 'Explorer', value: 'viewer' }];
    usernamePattern = /^[a-zA-Z0-9]+$/;
    emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    errorMessageClosed: boolean = true;
    errorMessage: string = '';
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
        if (!form.form.valid) {
            this.showAlert('alertSignup');
            this._alertService.error('Please enter valid signup details.');
            this.loading = false;
        }
        self.model.host_ = window.location.origin;
        let hosted_zone =  this.model.organisation_attributes && this.model.organisation_attributes.hoseted_zone ? this.model.organisation_attributes.hoseted_zone : ""
        self._authService.setHostedZone(hosted_zone);
        this._authService.signup(this.model)
            .subscribe(
                data => {
                    this.errorMessageClosed = true;
                    this.loading = false;
                    localStorage.setItem('isSignupSuccess', 'true');
                    form.reset();
                },
                error => {
                    var errors = JSON.parse(error._body);
                    var err = _.flatten(errors['validation_errors'][0]);
                    this.errorMessageClosed = false;
                    this.errorMessage = this.jsUcfirst(err[0]) + ' ' + err[1];
                    this.loading = false;
                });
    }
    jsUcfirst(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    showAlert(target) {
        this[target].clear();
        let factory = this.cfr.resolveComponentFactory(AlertComponent);
        let ref = this[target].createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }
}