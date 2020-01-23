import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation, ElementRef } from "@angular/core";
import { ActivatedRoute, Router, Params } from "@angular/router";

import { AuthenticationService } from "../_services/authentication.service";
import { AlertService } from "../_services/alert.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from "rxjs";
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
    isSignupSuccessMsg: boolean = false;
    errorMessageClosed: boolean = true;
    errorMessage: string = '';
    isUsernamePattern :boolean = true;
    usernamePattern = /^[a-zA-Z0-9]+$/;
    emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    appliedPattern : any = this.usernamePattern;

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
        let self = this;
        if(localStorage.getItem('isSignupSuccess') == 'true'){
          this.isSignupSuccessMsg = true;
        } else{
          this.isSignupSuccessMsg = false;
        } 
        
    }
    
    validateUsernameOrEmail($event){
        let self = this;
        if($event.includes('@')){
            self.appliedPattern = self.emailPattern;
            self.isUsernamePattern = false;
        }else{
            self.appliedPattern = self.usernamePattern;
            self.isUsernamePattern = true;
        }
        
    }


    onSubmit() {
        var self = this;
        var params = {
            subdomain : self.model.subdomain,
            username_or_email: self.model.username_or_email
        }
        self._authService.validateSubdomain(params).then(response => {
            if (response.status) {
                this.errorMessageClosed = true;
                localStorage.setItem('allowed_url', response.url);
                if(response.url.length > 1){
                    this.returnUrls = response.url
                    this.open(this.content)
                }
                else{
                    window.location.href = response.url[0];
                }
            } else {
                this.errorMessageClosed = false;
                this.errorMessage = "Workspace doesn't exist";
            }
        }, function (error) {
            let errMsg = JSON.parse(error._body);
            this.errorMessageClosed = false;
            this.errorMessage = errMsg;
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
    closeMsg(){
        this.isSignupSuccessMsg = false;
        localStorage.removeItem('isSignupSuccess');
    }

}