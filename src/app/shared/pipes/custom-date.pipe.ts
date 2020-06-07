import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormatsConstants } from '../constants/formats.constants';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  constructor(private datePipe: DatePipe){

  }

  transform(date: Date | string): string {
    // date = new Date(date);
    const format = FormatsConstants.dayMonthYearSlashFormat;
    // return new DatePipe('en-US').transform(date, format);
    return this.datePipe.transform(date, format);
  }

}
