import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value:any, filterString:string): any[] {
    if(value.length == 0) {
      return value;
    }
    const result:any[] = [];
    for(const item of value) {
      if(item['status'] === filterString) {
        result.push(item);
      }
    }
    return result;
  }
}
