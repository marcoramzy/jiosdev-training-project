import { Component, OnInit } from '@angular/core';
import { CalenderService } from '../calender.service';
import { DatePipe } from '@angular/common';
import { EventData } from 'src/app/shared/models/event-data';
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-calender-list',
    templateUrl: './calender-list.component.html',
    styleUrls: ['./calender-list.component.scss']
})
export class CalenderListComponent implements OnInit {

    form: FormGroup;
    eventData: EventData[];

    constructor(
        private calenderService: CalenderService,
        private datePipe: DatePipe,
        private fb: FormBuilder) { }

    ngOnInit(): void {
        const initialDate = new Date();
        const startDate = initialDate.toString();
        const endDate = new Date(initialDate.setDate(initialDate.getDate() + 7));
        console.log(startDate);
        console.log(startDate);
        this.getEvents(this.transformDate(startDate), this.transformDate(endDate));
        this.initForm(startDate, endDate);
    }

    initForm(startDate2, endDate) {
        const startDate = new Date();
        this.form = this.fb.group({
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
            this.eventData = res;
            this.setupGrid(this.eventData);
            console.log('getEvents here', res);
        });
    }

    transformDate(date) {
        return this.datePipe.transform(date, 'yyyy-MM-dd');
    }

    getShortTime(date) {
        return this.datePipe.transform(date, 'h:mm a');
    }

    onFilterClick() {

        const { value, valid } = this.form;

        if ( new Date(value.startDate) > new Date(value.endDate) ){
            this.form.patchValue({
                endDate: value.startDate
            });

            value.endDate = value.startDate;
        }

        console.log('value', value);
        this.getEvents(this.transformDate(value.startDate), this.transformDate(value.endDate));

        if (valid) {
        }
    }

}
