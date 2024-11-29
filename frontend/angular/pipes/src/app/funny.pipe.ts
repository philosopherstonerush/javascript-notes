import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  standalone: true,
  name: 'funny'
})
export class FunnyPipe implements PipeTransform{
    transform(value: any, ...args: any[]) {
      return value + " HAHAHA";
    }
}
