import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes , RouterModule } from '@angular/router';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { SiteFooterComponent } from './site-footer/site-footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ngxZendeskWebwidgetModule, ngxZendeskWebwidgetConfig} from 'ngx-zendesk-webwidget';
import { FormsModule } from '@angular/forms';

export class ZendeskConfig extends ngxZendeskWebwidgetConfig {
    accountUrl = 'kumolus.zendesk.com';
    beforePageLoad(zE) {
      zE.setLocale('en');
      zE.hide();
    }
  }

@NgModule({
    declarations: [
        SiteHeaderComponent,
        SiteFooterComponent
    ],
    exports: [
        SiteHeaderComponent,
        SiteFooterComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        RouterModule,
        NgbModule.forRoot(),
        ngxZendeskWebwidgetModule.forRoot(ZendeskConfig)
    ]
})
export class SitLayoutModule {
}