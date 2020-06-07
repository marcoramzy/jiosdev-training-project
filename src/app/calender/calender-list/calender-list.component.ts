import { Component, OnInit } from '@angular/core';
import { CalenderService } from '../calender.service';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { AppCalenderListModel } from './calender-list.model';
import { FormatsConstants } from 'src/app/shared/constants/formats.constants';

@Component({
    selector: 'app-calender-list',
    templateUrl: './calender-list.component.html',
    styleUrls: ['./calender-list.component.scss']
})
export class CalenderListComponent implements OnInit {

    model: AppCalenderListModel;

    constructor(
        private calenderService: CalenderService,
        private datePipe: DatePipe,
        private fb: FormBuilder) {
            this.initModel();
        }

    ngOnInit(): void {
        const initialDate = new Date();
        const startDate = initialDate.toString();
        const endDate = new Date(initialDate.setDate(initialDate.getDate() + 7));
        this.getEvents(startDate, endDate);
        this.initForm(endDate);
    }

    initForm(endDate: Date) {
        const startDate = new Date();
        this.model.form = this.fb.group({
            startDate: [startDate],
            endDate: [endDate]
        });
    }

    setupGrid(dataSource) {
        $('#grid').kendoGrid({
            dataSource: {
                data: dataSource,
                pageSize: 20
            },
            height: 550,
            groupable: true,
            sortable: true,
            pageable: {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            },
            columns: [{
                field: `Title`,
                title: `Title`
            }, {
                field: `Start`,
                title: `Start Date`
            }, {
                // template: this.datePipe.transform('#= data.End #', 'h:mm a'),
                field: `End`,
                title: `End Date`
            }, {
                field: `Description`,
                title: `Description`
            }]
        });

    }

    getEvents(startDate, endDate) {
        this.calenderService.getEvents(startDate, endDate).pipe(
            map(res => {
                // tslint:disable-next-line: forin
                for (const key in res) {
                    res[key].Start = this.getShortTime(res[key].Start);
                    res[key].End = this.getShortTime(res[key].End);
                }
                return res;
            })
        ).subscribe((res) => {
            this.model.eventData = res;
            this.setupGrid(this.model.eventData);
        });
    }

    getShortTime(date) {
        return this.datePipe.transform(date, FormatsConstants.timeAmPmFormat);
    }

    onFilterClick() {

        const { value, valid } = this.model.form;

        if ( new Date(value.startDate) > new Date(value.endDate) ){
            this.model.form.patchValue({
                endDate: value.startDate
            });

            value.endDate = value.startDate;
        }

        console.log('value', value);
        this.getEvents(value.startDate, value.endDate);

        if (valid) {
        }
    }

    private initModel() {
        this.model = new AppCalenderListModel();
    }

}
