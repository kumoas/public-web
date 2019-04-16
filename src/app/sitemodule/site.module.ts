import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BaseRequestOptions, HttpModule } from "@angular/http";
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ngxZendeskWebwidgetModule } from 'ngx-zendesk-webwidget';

import { AlertComponent } from "./_directives/alert.component";
import { SiteComponent } from './site.component';
import { SitLayoutModule } from './site-layout/sitlayout.module'
import { HomeComponent } from './home/home.component';
import { FeatureComponent } from './feature/feature.component';
import { SolutionsComponent } from './solutions/solutions.component';
import { PartnersComponent } from './partners/partners.component';
import { PricingComponent } from './pricing/pricing.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { AboutComponent } from './about/about.component';
import { WorkspaceComponent } from './workspace/workspace.component';

import { AlertService } from "./_services/alert.service";
import { AuthenticationService } from "./_services/authentication.service";
import { CoreModule } from '../core/core.module';

const routes: Routes = [
    {
        "path": "",
        "component": SiteComponent,
        "children": [
            { 
                "path": "",
                "component": HomeComponent,
            },
            { 
                "path": "home", 
                "component": HomeComponent,
            },
            { 
                "path": "features", 
                "component": FeatureComponent,
            },
            { 
                "path": "solution/:type", 
                "component": SolutionsComponent,
            },
            { 
                "path": "solution", 
                "component": SolutionsComponent,
            },
            { 
                "path": "partners", 
                "component": PartnersComponent,
            },
            { 
                "path": "pricing", 
                "component": PricingComponent,
            },
            { 
                "path": "terms", 
                "component": TermsComponent,
            },
            {
                "path": "privacy", 
                "component": PrivacyComponent,  
            },
            {
                "path": "aboutus", 
                "component": AboutComponent,  
            },
            {
                "path": "workspace",
                "component": WorkspaceComponent,
            },
            {
                "path": "",
                "redirectTo": "home",
                "pathMatch": "full"
            }
        ],
    }
];

@NgModule({
    declarations: [
        AlertComponent,
        SiteComponent,
        HomeComponent,
        FeatureComponent,
        SolutionsComponent,
        PricingComponent,
        PartnersComponent,
        TermsComponent,
        PrivacyComponent,
        AboutComponent,
        WorkspaceComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        NgbModule.forRoot(),
        SitLayoutModule,
        RouterModule.forChild(routes),
        CoreModule,
    ],
    providers: [
        AlertService,
        AuthenticationService,
        BaseRequestOptions
    ],
    entryComponents: [AlertComponent],
    exports: [RouterModule, SiteComponent]
})
export class SiteModule { }
