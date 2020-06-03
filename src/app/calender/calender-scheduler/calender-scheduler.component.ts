import { Component, OnInit } from '@angular/core';
import { CalenderService } from '../calender.service';
import { DatePipe } from '@angular/common';
import { EventData } from 'src/app/shared/models/event-data';
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-calender-scheduler',
    templateUrl: './calender-scheduler.component.html',
    styleUrls: ['./calender-scheduler.component.scss']
})
export class CalenderSchedulerComponent implements OnInit {

    form: FormGroup;
    eventData: EventData[];

    constructor(
        private calenderService: CalenderService,
        private datePipe: DatePipe,
        private fb: FormBuilder) { }

    ngOnInit(): void {
        this.setupSched();
    }

    setupSched(){
            function scheduler_view_range(e) {
                const view = e.sender.view();

                // The view has:
                // A startDate method which returns the start date of the view.
                // An endDate method which returns the end date of the view.

                $('.console').append('<p>' + kendo.format('view:: start: {0:d}; end: {1:d};', view.startDate(), view.endDate()) + '</p>');
            }

            $('#scheduler').kendoScheduler({
                date: new Date(),
                startTime: new Date(),
                height: 400,
                timezone: 'Etc/UTC',
                views: [
                    {type: 'day', selected: false},
                    {type: 'workWeek', selected: false},
                    {type: 'week', selected: false},
                    {type: 'month', selected: true},
                    {type: 'agenda', selected: false},
                    {type: 'timeline', eventHeight: 50}
                ],
                navigate(e) {
                //   $('.console').append('<p><strong>Navigated from:</strong></p>');
                //   scheduler_view_range(e);
                },
                dataBound(e) {
                  $('.console').append('<p><strong>Navigated to:</strong></p>');
                  scheduler_view_range(e);
                },
                dataSource: {
                    batch: true,
                    transport: {
                        read: {
                            url: '//demos.telerik.com/kendo-ui/service/tasks',
                            dataType: 'jsonp'
                        },
                        update: {
                            url: '//demos.telerik.com/kendo-ui/service/tasks/update',
                            dataType: 'jsonp'
                        },
                        create: {
                            url: '//demos.telerik.com/kendo-ui/service/tasks/create',
                            dataType: 'jsonp'
                        },
                        destroy: {
                            url: '//demos.telerik.com/kendo-ui/service/tasks/destroy',
                            dataType: 'jsonp'
                        },
                        parameterMap(options, operation) {
                            if (operation !== 'read' && options.models) {
                                return {models: kendo.stringify(options.models)};
                            }
                        }
                    },
                    schema: {
                        model: {
                            id: 'taskID',
                            fields: {
                                taskID: { from: 'TaskID', type: 'number' },
                                title: { from: 'Title', defaultValue: 'No title', validation: { required: true } },
                                start: { type: 'date', from: 'Start' },
                                end: { type: 'date', from: 'End' },
                                startTimezone: { from: 'StartTimezone' },
                                endTimezone: { from: 'EndTimezone' },
                                description: { from: 'Description' },
                                recurrenceId: { from: 'RecurrenceID' },
                                recurrenceRule: { from: 'RecurrenceRule' },
                                recurrenceException: { from: 'RecurrenceException' },
                                ownerId: { from: 'OwnerID', defaultValue: 1 },
                                isAllDay: { type: 'boolean', from: 'IsAllDay' }
                            }
                        }
                    }
                }
            });
      }
}
