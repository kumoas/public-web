import { NgModule, ErrorHandler } from '@angular/core';
import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { GlobalErrorHandler } from './services/errorhandle';
import { ScriptLoaderService } from './services/scriptloader';
import { HttpFactory } from './interceptor/http.factory';
import { UserService } from './services/user';
import { DateFormatService } from './services/dateformat';
import { CallbackPipe } from './pipes/callback.pipe';
import { ImageService } from './services/image/image.service';
import { KumolusFlashService } from './services/flashmessages';
import { KumolusLoaderService } from './services/loader';
import { GroupByPipe } from './pipes/group.by.pipe';
import { StorageService } from './services/storage';
import { Broadcaster } from './services/broadcast';

@NgModule({
    declarations: [
        CallbackPipe,
        GroupByPipe
    ],
    imports: [
    ],
    exports: [
        CallbackPipe,
        GroupByPipe
    ],
    providers: [
        ScriptLoaderService,
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
        {
            provide: Http,
            useFactory: HttpFactory,
            deps: [XHRBackend, RequestOptions]
        },
        UserService,
        DateFormatService,
        ImageService,
        KumolusFlashService,
        KumolusLoaderService,
        StorageService,
        Broadcaster,
    ],
})

export class CoreModule { }