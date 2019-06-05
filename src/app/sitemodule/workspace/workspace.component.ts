import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { AuthenticationService } from "../_services/authentication.service";
import { AlertService } from "../_services/alert.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: "kumo-site-workspace",
    templateUrl: './workspace.component.html',
    styleUrls: ['./workspace.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class WorkspaceComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrls: any = [];

    @ViewChild('alertSignin', { read: ViewContainerRef }) alertSignin: ViewContainerRef;
    @ViewChild('content') content: ElementRef;
    constructor(private _router: Router,
        private _route: ActivatedRoute,
        private _authService: AuthenticationService,
        private _alertService: AlertService,
        private flashMessageService: FlashMessagesService,
        private cfr: ComponentFactoryResolver,
        private modalService: NgbModal) {
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
                if(response.url.length > 1){
                    this.returnUrls = response.url
                    this.open(this.content)
                }
                else{
                    window.location.href = response.url[0];
                }
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

    open(content){
        this.modalService.open(content).result.then((result) => {
        //   this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
        //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    redirect(url){
        window.location.href = url;
    }

}