import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ngxZendeskWebwidgetService } from 'ngx-zendesk-webwidget';

@Component({
  selector: 'kumo-site-footer',
  templateUrl: './site-footer.component.html',
  styleUrls: ['./site-footer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SiteFooterComponent implements OnInit {
  constructor(private _ngxZendeskWebwidgetService: ngxZendeskWebwidgetService) { 

     _ngxZendeskWebwidgetService.show()
  }
  ngOnInit() {
    
  }
}