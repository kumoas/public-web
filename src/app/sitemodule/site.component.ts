import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kumo-site-layout',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SiteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
