import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'kumo-site-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FeatureComponent implements OnInit {
  closeResult: string;
  public activityType ="automation";

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    window.scrollTo(0,0);
  }
  togglefeature(type){
    var self = this;
    self.activityType = type;
  }

  open(content) {
    this.modalService.open(content, { size: 'lg' });
  }
}