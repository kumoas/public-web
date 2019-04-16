import { Injectable } from '@angular/core';
import { Helpers } from './../../../core/helpers/helpers';

import 'rxjs/add/operator/toPromise';
import * as _ from 'underscore';


declare var myApp: any;
declare var toastr: any;

@Injectable()



export class KumolusFlashService {
    constructor() {

    }

    ngOnInit() {
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": true,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "timeOut": "500000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };
		/*toastr.info('Are you the 6 fingered man?');
		toastr.error('I do not think that word means what you think it means.', 'Inconceivable!');
		toastr.warning('My name is Inigo Montoya. You killed my father, prepare to die!')

		// Display a success toast, with a title
		toastr.success('Have fun storming the castle!', 'Miracle Max Says')

		// Display an error toast, with a title
		toastr.error('I do not think that word means what you think it means.', 'Inconceivable!')

		// Immediately remove current toasts without using animation
		toastr.remove()

		// Remove current toasts using animation
		toastr.clear()

		// Override global options
		toastr.success('We do have the Kapua suite available.', 'Turtle Bay Resort', {timeOut: 5000})
		*/
    }

    show(type, message) {
        if (toastr[type]) {
            toastr[type](message);
        }
        else {
            toastr.info(message);
        }
    }

    showErrors(error){
        let message: any = '';
        if(typeof error === 'object' && error.constructor === Object){
            if(error.backtrace) { delete error.backtrace; }
            error = Object.values(error);
            _.each(error , function(e){
                if(typeof e == "string"){
                    message += e + '\n';    
                }             
            })
        }
        else if(typeof error === 'object' && error.constructor === Array){
            _.each(error , function(e){
                if(typeof e == "string"){
                    message += e + '\n' ;    
                }             
            })
        }
        toastr["error"](message);
    }


}