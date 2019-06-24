import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { UserService } from "../_services/user.service";
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
    selector: "kumo-sitemodule-confirm",
    templateUrl: './confirm.component.html',
    encapsulation: ViewEncapsulation.None,
    providers :[UserService]
})

export class ConfirmComponent implements OnInit {
    user: any = {};

    constructor(private _router: Router,
        private _userService: UserService,
        private _route: ActivatedRoute,
        private flashMessagesService: FlashMessagesService
    ) {
    }

    ngOnInit() {
        var self = this;

        self.user.confirmation_token = self._route.snapshot.queryParams["confirmation_token"];

        if (self.user && self.user.confirmation_token) {

            self._userService.confirm(self.user)
                .subscribe(
                    data => {
                        self._router.navigate(['workspace']);
                        self.flashMessagesService.show('Email confirmed. Please Login.', { cssClass: 'alert-success', timeout: 10000 });
                        self.user = {};
                    },
                    error => {
                        self._router.navigate(['workspace']);
                        // The link has been disabled as its been already used.
                        self.flashMessagesService.show(JSON.parse(error._body).error_code, { cssClass: 'alert-danger', timeout: 10000 })
                        self.user = {};
                    });
        } else {
            self._router.navigate(['workspace']);
            self.flashMessagesService.show('Confirm code not provided.', { cssClass: 'alert-danger', timeout: 10000 })
        }
    }
}