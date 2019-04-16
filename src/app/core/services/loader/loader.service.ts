import { Injectable } from '@angular/core';
import { Helpers } from './../../../core/helpers/helpers';

declare var mApp: any;

@Injectable()

export class KumolusLoaderService {

    blockOptions = {
        overlayColor: '#000000',
        type: 'loader',
        state: 'success',
        message: 'Please wait...'
    };

    constructor() {

    }

    ngOnInit() {

    }

    show(cls: any = false) {
        //use .m-body for blocking content below header so that user can click on header if any error occured and unblock does not work 
        var self = this;
        if (!cls) {
            mApp.blockPage(self.blockOptions);
        }
        else {
            mApp.block(cls, self.blockOptions);
        }
    }

    hide(cls: any = false) {
        if (!cls) {
            mApp.unblockPage();
        }
        else {
            mApp.unblock(cls);
        }
    }

}