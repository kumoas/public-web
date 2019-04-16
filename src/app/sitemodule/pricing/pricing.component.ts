import { Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'kumo-site-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
  providers: [NgbTooltipConfig],
  encapsulation: ViewEncapsulation.None,
})
export class PricingComponent implements OnInit {
  public activityType = "explorer";
  constructor(private modalService: NgbModal , config: NgbTooltipConfig) { 
    config.placement = 'bottom';
    config.triggers = 'click';
  }

  ngOnInit() {
    window.scrollTo(0,0);
  }

  togglepricing(type) {
    var self = this;
    self.activityType = type;
  }
  openCompare(content) {
    this.modalService.open(content, { size: 'lg' });
  }
}