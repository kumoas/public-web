import * as $ from "jquery";
import * as moment from 'moment';
declare let mApp: any;
declare let mUtil: any;
declare var _: any;

export class Helpers {
    public mappingInstanceType:any = {'t1.micro':[0,0], 't2.nano':[0,0], 't2.micro':[0,0], 't2.small':[0,0], 't2.medium':[0,0], 't2.large':[0,0], 't2.xlarge':[0,0], 't2.2xlarge':[0,0], 'm4.large':[0,0], 'm4.xlarge':[0,0], 'm4.2xlarge':[0,0], 'm4.4xlarge':[0,0], 'm4.10xlarge':[0,0], 'm4.16xlarge':[0,0], 'm3.medium':[0,0], 'm3.large':[0,0], 'm3.xlarge':[0,0], 'm3.2xlarge':[0,0], 'm2.xlarge':[2,0], 'm2.2xlarge':[2,0],'m2.4xlarge':[2,0], 'm1.small':[0,0],'m1.medium':[0,0],'m1.large':[0,0],'m1.xlarge':[0,0], 'p3.2xlarge':[0,0], 'p3.8xlarge':[0,0], 'p3.16xlarge':[0,0], 'cr1.8xlarge':[2,0],'c4.large':[0,0], 'c4.xlarge':[0,0], 'c4.2xlarge':[0,0], 'c4.4xlarge':[0,0], 'c4.8xlarge':[0,0], 'c3.large':[2,2], 'c3.xlarge':[2,2], 'c3.2xlarge':[2,2], 'c3.4xlarge':[2,2], 'c3.8xlarge':[2,2], 'c1.medium':[2,2],'c1.xlarge':[2,2], 'f1.2xlarge':[2,0], 'f1.16xlarge':[2,0], 'g3.4xlarge':[0,0], 'g3.8xlarge':[0,0], 'g3.16xlarge':[0,0], 'g2.2xlarge':[2,0], 'g2.8xlarge':[2,0], 'p2.xlarge':[0,0], 'p2.8xlarge':[0,0], 'p2.16xlarge':[0,0],  'r4.large':[0,0], 'r4.xlarge':[0,0], 'r4.2xlarge':[0,0], 'r4.4xlarge':[0,0], 'r4.8xlarge':[0,0], 'r4.16xlarge':[0,0], 'r3.large':[2,0], 'r3.xlarge':[2,0], 'r3.2xlarge':[2,0], 'r3.4xlarge':[2,0], 'r3.8xlarge':[2,0], 'x1.16xlarge':[2,0], 'x1.32xlarge':[2,0], 'd2.xlarge':[2,0], 'd2.2xlarge':[2,0], 'd2.4xlarge':[2,0], 'd2.8xlarge':[2,0], 'i2.xlarge':[2,0], 'i2.2xlarge':[2,0], 'i2.4xlarge':[2,0], 'i2.8xlarge':[2,0], 'i3.large':[2,0], 'i3.xlarge':[2,0], 'i3.2xlarge':[2,0], 'i3.4xlarge':[2,0], 'i3.8xlarge':[2,0], 'i3.16xlarge':[2,0], 'x1e.xlarge':[2,0], 'x1e.2xlarge':[2,0], 'x1e.4xlarge':[2,0], '1e.8xlarge':[2,0], 'x1e.16xlarge':[2,0], 'x1e.32xlarge':[2,0], 'hs1.8xlarge':[2,0], 'h1.2xlarge':[2,0],'h1.4xlarge':[2,0], 'h1.8xlarge':[2,0], 'h1.16xlarge':[2,0],'cc2.8xlarge':[2,2]};
    public mappingOfTypes:any = {'ebs':0, 'instance-store': 1, 'hvm': 0, 'paravirtual': 1};

    static loadStyles(tag, src) {
        if (Array.isArray(src)) {
            $.each(src, function(k, s) {
                $(tag).append($('<link/>').attr('href', s).attr('rel', 'stylesheet').attr('type', 'text/css'));
            });
        } else {
            $(tag).append($('<link/>').attr('href', src).attr('rel', 'stylesheet').attr('type', 'text/css'));
        }
    }

    static unwrapTag(element) {
        $(element).removeAttr('appunwraptag').unwrap();
    }

    static domainify(text) {
        let urlRegex = /(https?:\/\/[^\s]+)/g;
        let currentBase = this.extractDomain(document.baseURI)
        return text.replace(urlRegex, function(url) {
            let domain_ = this.extractDomain(url);
            return (domain_ == 'www.w3.org') ? url : url.replace(domain_, currentBase);
        });
    }


    static extractDomain(url) {
        return (url.indexOf("://") > -1) ? url.split('/')[2] : url.split(':')[0];
    }

	/**
	 * Set title markup
	 * @param title
	 */
    static setTitle(title) {
        $('.m-subheader__title').text(title);
    }

	/**
	 * Breadcrumbs markup
	 * @param breadcrumbs
	 */
    static setBreadcrumbs(breadcrumbs) {
        if (breadcrumbs) $('.m-subheader__title').addClass('m-subheader__title--separator');

        let ul = $('.m-subheader__breadcrumbs');

        if ($(ul).length === 0) {
            ul = $('<ul/>').addClass('m-subheader__breadcrumbs m-nav m-nav--inline')
                .append($('<li/>').addClass('m-nav__item')
                    .append($('<a/>').addClass('m-nav__link m-nav__link--icon')
                        .append($('<i/>').addClass('m-nav__link-icon la la-home'))));
        }

        $(ul).find('li:not(:first-child)').remove();
        $.each(breadcrumbs, function(k, v) {
            let li = $('<li/>').addClass('m-nav__item')
                .append($('<a/>').addClass('m-nav__link m-nav__link--icon').attr('routerLink', v.href).attr('title', v.title)
                    .append($('<span/>').addClass('m-nav__link-text').text(v.text)));
            $(ul).append($('<li/>').addClass('m-nav__separator').text('-')).append(li);
        });
        $('.m-subheader .m-stack__item:first-child').append(ul);
    }

    static setLoading(enable) {
        let body = $('body');
        if (enable) {
            $(body).addClass('m-page--loading-non-block')
        } else {
            $(body).removeClass('m-page--loading-non-block')
        }
    }

    static bodyClass(strClass) {
        $('body').attr('class', strClass);
    }

    static serialize(queryParams) {
        var string = [];
        for (var value in queryParams)
            if (queryParams.hasOwnProperty(value)) {
                string.push(encodeURIComponent(value) + "=" + encodeURIComponent(queryParams[value]));
            }
        return string.join("&");
    }

    static getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10, numberOfDisplayedPages: number = 5) {
        currentPage = +currentPage;

        let totalPages = Math.ceil(totalItems / pageSize);

        let startPage: number, endPage: number;
        let pageInterval = numberOfDisplayedPages - Math.floor(numberOfDisplayedPages/2);

        if (currentPage <= pageInterval) {
            startPage = 1;
            endPage = numberOfDisplayedPages > totalPages ? totalPages : numberOfDisplayedPages;
        } else {
            startPage = currentPage - pageInterval > (totalPages-numberOfDisplayedPages) ? (totalPages-numberOfDisplayedPages+1) : currentPage - pageInterval;
            endPage = (currentPage + pageInterval) > totalPages ? totalPages: currentPage + pageInterval;
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize, totalItems);
        if (totalItems === 1) {
            endIndex = 1;
        }
        let pages = Array.from({ length: Math.min(numberOfDisplayedPages,totalPages) }, (_, i) => startPage + i);
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }


    static initPopOver(el){            
        $('[data-toggle="m-popover"]').each(function() {
            var skin = el.data('skin') ? 'm-popover--skin-' + el.data('skin') : '';
            el.popover({                
                template: '\<div class="m-popover ' + skin + ' popover" role="tooltip">\<div class="arrow"></div>\<h3 class="popover-header"></h3>\<div class="popover-body"></div>\</div>'
            });
        });
    }
    static initScrollables() {
        $('[data-scrollable="true"]').each(function(){
            var maxHeight;
            var height;
            var el = $(this);

            if (mUtil.isInResponsiveRange('tablet-and-mobile')) {
                if (el.data('mobile-max-height')) {
                    maxHeight = el.data('mobile-max-height');
                } else {
                    maxHeight = el.data('max-height');
                }

                if (el.data('mobile-height')) {
                    height = el.data('mobile-height');
                } else {
                    height = el.data('height');
                }
            } else {
                maxHeight = el.data('max-height');
                height = el.data('max-height');
            }

            if (maxHeight) {
                el.css('max-height', maxHeight);
            }
            if (height) {
                el.css('height', height);
            }

            mApp.initScroller(el, {});
        });
    }

    static initTooltip(el) {
        $('[data-toggle="m-tooltip"]').each(function() {
            var skin = el.data('skin') ? 'm-tooltip--skin-' + el.data('skin') : '';
                
            el.tooltip({
                trigger: 'hover',
                template: '<div class="m-tooltip ' + skin + ' tooltip" role="tooltip">\<div class="arrow"></div>\
                    <div class="tooltip-inner"></div>\</div>'
            });
        });
    }

    static sizeOf(obj) {
        if(obj)
        return Object.keys(obj).length;
    }

    static convertObjToArray(Obj) {
        var resArr = [];
        for (var k in Obj) {
            var dt = { key: k, value: Obj[k] };
            resArr.push(dt);
        }
        return resArr;
    }

    static getHours() {
        var a = [];
        for (let i = 0; i < 24; i++) {
            if (i < 10)
                a.push("0" + i + "")
            else
                a.push("" + i + "")
        }
        return a;
    }

    static getMinutes() {
        var a = [];
        for (let i = 0; i < 60; i++) {
            if (i < 10)
                a.push("0" + i + "")
            else
                a.push("" + i + "")
        }
        return a;
    }

    static kost = function (t) {
        try {
            return (t >= 0.01 || t <= 0.00001) ? t.toFixed(2) : t.toFixed(4);
        } catch (e) {
            return 0.00;
        }
    };

    static getSupportedInstance(propRootDevice, propVirtualization, options)
    {
        let mappingInstanceType:any = {'t1.micro':[0,0], 't2.nano':[0,0], 't2.micro':[0,0], 't2.small':[0,0], 't2.medium':[0,0], 't2.large':[0,0], 't2.xlarge':[0,0], 't2.2xlarge':[0,0], 'm4.large':[0,0], 'm4.xlarge':[0,0], 'm4.2xlarge':[0,0], 'm4.4xlarge':[0,0], 'm4.10xlarge':[0,0], 'm4.16xlarge':[0,0], 'm3.medium':[0,0], 'm3.large':[0,0], 'm3.xlarge':[0,0], 'm3.2xlarge':[0,0], 'm2.xlarge':[2,0], 'm2.2xlarge':[2,0],'m2.4xlarge':[2,0], 'm1.small':[0,0],'m1.medium':[0,0],'m1.large':[0,0],'m1.xlarge':[0,0], 'p3.2xlarge':[0,0], 'p3.8xlarge':[0,0], 'p3.16xlarge':[0,0], 'cr1.8xlarge':[2,0],'c4.large':[0,0], 'c4.xlarge':[0,0], 'c4.2xlarge':[0,0], 'c4.4xlarge':[0,0], 'c4.8xlarge':[0,0], 'c3.large':[2,2], 'c3.xlarge':[2,2], 'c3.2xlarge':[2,2], 'c3.4xlarge':[2,2], 'c3.8xlarge':[2,2], 'c1.medium':[2,2],'c1.xlarge':[2,2], 'f1.2xlarge':[2,0], 'f1.16xlarge':[2,0], 'g3.4xlarge':[0,0], 'g3.8xlarge':[0,0], 'g3.16xlarge':[0,0], 'g2.2xlarge':[2,0], 'g2.8xlarge':[2,0], 'p2.xlarge':[0,0], 'p2.8xlarge':[0,0], 'p2.16xlarge':[0,0],  'r4.large':[0,0], 'r4.xlarge':[0,0], 'r4.2xlarge':[0,0], 'r4.4xlarge':[0,0], 'r4.8xlarge':[0,0], 'r4.16xlarge':[0,0], 'r3.large':[2,0], 'r3.xlarge':[2,0], 'r3.2xlarge':[2,0], 'r3.4xlarge':[2,0], 'r3.8xlarge':[2,0], 'x1.16xlarge':[2,0], 'x1.32xlarge':[2,0], 'd2.xlarge':[2,0], 'd2.2xlarge':[2,0], 'd2.4xlarge':[2,0], 'd2.8xlarge':[2,0], 'i2.xlarge':[2,0], 'i2.2xlarge':[2,0], 'i2.4xlarge':[2,0], 'i2.8xlarge':[2,0], 'i3.large':[2,0], 'i3.xlarge':[2,0], 'i3.2xlarge':[2,0], 'i3.4xlarge':[2,0], 'i3.8xlarge':[2,0], 'i3.16xlarge':[2,0], 'x1e.xlarge':[2,0], 'x1e.2xlarge':[2,0], 'x1e.4xlarge':[2,0], '1e.8xlarge':[2,0], 'x1e.16xlarge':[2,0], 'x1e.32xlarge':[2,0], 'hs1.8xlarge':[2,0], 'h1.2xlarge':[2,0],'h1.4xlarge':[2,0], 'h1.8xlarge':[2,0], 'h1.16xlarge':[2,0],'cc2.8xlarge':[2,2]};
        let mappingOfTypes:any = {'ebs':0, 'instance-store': 1, 'hvm': 0, 'paravirtual': 1};
         options = options && options.length > 0 ? options : Object.keys(mappingInstanceType);
         var filteredOptions = _.filter(options, function(option){ return (!mappingInstanceType[option] || (mappingInstanceType[option] && (mappingInstanceType[option][0] == mappingOfTypes[propRootDevice] || mappingInstanceType[option][0] == 2) && (mappingInstanceType[option][1] == mappingOfTypes[propVirtualization] || mappingInstanceType[option][1] == 2) )); });
         return filteredOptions;
    }

}