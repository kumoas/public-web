import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './../../core/services/user';
import { KumolusFlashService } from '../../core/services/flashmessages';
import { Helpers } from '../../core/helpers/helpers';
import { ScriptLoaderService } from '../../core/services/scriptloader';

declare var $: any;
import * as moment from 'moment-timezone';

@Component({
  selector: 'kumo-site-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit, AfterViewInit {

 public  user: any  = {};
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  isSaving = false;

  constructor(private _script: ScriptLoaderService, private modalService: NgbModal, private userService: UserService, private _flashMessagesService: KumolusFlashService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    // TODO: Don.t import all vendors.bundle.js and scripts.bundle.js. Load only files which are required here.
    // If this files are loaded for only datetime picker then load only related files
    // At the time of removing jqurry date time picker remove this scripts form here
    this._script.load('body', 'assets/vendors/base/vendors.bundle.js', 'assets/demo/demo2/base/scripts.bundle.js')
      .then(result => {
        Helpers.setLoading(false);
    });
  }
  openModel(){
    $('#requestDemo').modal('show');
  }

  submitQueryForm(comingObject) {
    var self = this;
    self.isSaving = true;

    self.userService.request_demo(comingObject).then(data => {
      self._flashMessagesService.show('success', 'Schedule a Demo Successfully.');
      $('#requestDemo').modal('hide');
      self.isSaving = false;
    }, function (err) {
      let errMsg = "Failed to load filerlist.";
      self.isSaving = false;
      self._flashMessagesService.show(errMsg, { cssClass: 'alert-danger', timeout: 10000 });
    });
  }

  ngAfterViewInit() {
      var self = this;
      var dateToday = new Date();
      var default_format = "YYYY-MM-DD hh:mm A";
      var def_timezone = "Australia/Brisbane";
      self.user['start_date'] = moment(dateToday).tz(def_timezone).format(default_format); 

      $('#start_date').datetimepicker({
          format: 'yyyy-mm-dd hh:ii',
          startDate: dateToday,
          initialDate:dateToday,
          timezone: def_timezone,
          showMeridian: true,
          todayHighlight: true,
          autoclose: true,
          pickerPosition: 'bottom-left'                    
      }).on('changeDate', (ev) => {
        let self = this;
        self.user["start_date"] = moment(ev.date).tz(def_timezone).format(default_format);
      }); 
  }

}