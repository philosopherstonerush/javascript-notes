import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: string): string {
    let arr = value.split('');
    console.log(arr);
    arr.reverse()
    return arr.join('');
  }

}
