import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
    selector: 'kumo-site-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AboutComponent implements OnInit {
    constructor() { }
    ngOnInit() {
        window.scrollTo(0, 0);
    }
}