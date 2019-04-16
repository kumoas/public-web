import { Component, OnInit , ViewEncapsulation} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'kumo-site-privacy',
  templateUrl: './privacy.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PrivacyComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    window.scrollTo(0,0);
  }
}