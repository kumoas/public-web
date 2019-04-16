import { Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kumo-site-parters',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PartnersComponent implements OnInit {

  public activityType = "consulting";

  constructor() { }

  ngOnInit() {
    window.scrollTo(0,0);
  }

  togglePartners(type){
    var self = this;
    self.activityType = type;
  }
}