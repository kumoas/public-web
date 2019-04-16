import { Component, OnInit , ViewEncapsulation} from '@angular/core';
import { Router, ActivatedRoute , Params } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
declare var $: any;

@Component({
  selector: 'kumo-site-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SolutionsComponent implements OnInit {
 public activityType ="automation";
  constructor(private modalService: NgbModal , private route: ActivatedRoute , private router: Router) { }

  ngOnInit() {
    window.scrollTo(0,0);
    this.route.params.forEach((params: Params) => {
      if (params['type']) {
        this.activityType = params['type'];
      } 
  });
  }
  togglesolution(type){
    var self = this;
    self.activityType = type;
  }
  open(content) {
    this.modalService.open(content, { size: 'lg' });
  }
}