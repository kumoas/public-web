import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'callback',
    pure: false
})
export class CallbackPipe implements PipeTransform {
    transform(items: any[], params: any, callback: (item: any, params: any) => boolean): any {
        if (!items || !callback) {
            return items;
        }
        return items.filter(item => callback(item, params));
    }
}