import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  // transform(value: Date): unknown {
  //   return '1/1/2020';
  // }

  transform(date: Date | string): string {
    date = new Date(date);
    const format = 'dd/MM/y';
    return new DatePipe('en-US').transform(date, format);
  }

}
