import { Injectable, ErrorHandler } from "@angular/core";
import { Http } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import * as _ from 'underscore';
import * as moment from 'moment-timezone';
import { TimezoneConstant } from '../../../core/constants/timezone.constant';

@Injectable()
export class DateFormatService {

    default_format = "YYYY-MM-DD hh:mm A";
    def_timezone = "Australia/Brisbane";
    public allTimeZones: any;
   
    constructor(
        private http: Http,
    ) {
        var self = this;
        self.allTimeZones = TimezoneConstant.getAllTimeZones();
    }

    getAllTimezones() {
        var self = this;
        return self.allTimeZones;
    }

    getTimezones(timezone) {
        var self = this;
        if(timezone){
            return timezone.region + '/' + timezone.user_time_zone
        }else{
            return self.def_timezone
        }
    }

    getUserTime(time,format= null) {
        var self = this;
        if (time) {
            time = time.replace(/-/g, "/");
        }
        else {
            time = new Date();
        }
        var default_format = "YYYY-MM-DD hh:mm A";
        var def_timezone = "Australia/Brisbane";
        var data = JSON.parse(window.localStorage.getItem('user'))
        var user_time_zone;
        if(data.time_zone){
            user_time_zone = data.time_zone.region + '/' + data.time_zone.user_time_zone;
        }else{
            user_time_zone = def_timezone;
        }
        
        return moment(time).tz(user_time_zone).format((format ? format : default_format));
    }

    setUserTimeZone(userData){
        var self = this;
        var user = JSON.parse(localStorage.getItem('user'));

        if(userData.user_time_zone && userData.region){
            user.time_zone.user_time_zone = userData.user_time_zone;
            user.time_zone.region = userData.region;

            localStorage.setItem('user', JSON.stringify(user));
        }
        else if(user.time_zone.user_time_zone == '' && userData.user_time_zone == undefined){
            user.time_zone.user_time_zone = self.def_timezone;    
            localStorage.setItem('user', JSON.stringify(user));
        }
    }
}