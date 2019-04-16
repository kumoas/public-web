import { Component, OnInit , ViewEncapsulation} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'kumo-site-terms',
  templateUrl: './terms.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class TermsComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    window.scrollTo(0,0);
  }
}