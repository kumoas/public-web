import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import { SiteModule } from "./sitemodule/site.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {CoreModule} from './core/core.module';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { CookieService } from 'angular2-cookie/services/cookies.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SiteModule,
    CoreModule,
    FormsModule,
    AppRoutingModule,
    FlashMessagesModule,
    NgbModule.forRoot()
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
