import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kumo-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SiteHeaderComponent implements OnInit {

  public isNavbarCollapsed = false;
  
  constructor() { }

  ngOnInit() {
  }

}