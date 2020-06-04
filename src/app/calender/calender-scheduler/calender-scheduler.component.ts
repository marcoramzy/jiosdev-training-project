import { Component, OnInit } from '@angular/core';
import { CalenderService } from '../calender.service';
@Component({
    selector: 'app-calender-scheduler',
    templateUrl: './calender-scheduler.component.html',
    styleUrls: ['./calender-scheduler.component.scss']
})
export class CalenderSchedulerComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
        this.setupScheduler();
    }

    schedulerUpdateDatasource() {
        const scheduler = $('#scheduler').data('kendoScheduler') as any;
        setTimeout(() => {
            scheduler.dataSource.read();
        }, 10);
    }

    getStartDate() {
        const scheduler = $('#scheduler').data('kendoScheduler');
        const view = scheduler.view() as any;
        return kendo.format('{0:d}', view.startDate());
    }

    getEndDate() {
        const scheduler = $('#scheduler').data('kendoScheduler');
        const view = scheduler.view() as any;
        return kendo.format('{0:d}', view.endDate());
    }

    setupScheduler() {
        const self = this;

        $('#scheduler').kendoScheduler({
            date: new Date(),
            startTime: new Date(),
            height: 600,
            timezone: 'Etc/UTC',
            views: [
                { type: 'day', selected: false },
                { type: 'workWeek', selected: false },
                { type: 'week', selected: false },
                { type: 'month', selected: true },
                { type: 'agenda', selected: false },
                { type: 'timeline', eventHeight: 50 }
            ],
            navigate() {
                self.schedulerUpdateDatasource();
            },
            dataSource: {
                batch: true,
                transport: {
                    read: {
                        url: 'https://api-stage.chmeetings.com/35666DC28224AFCA/Public/Calendar/Events',
                        data: () => {
                            return {
                                start: self.getStartDate(),
                                end: self.getEndDate()
                            };
                        }
                    },
                },
                schema: {
                    data: 'Data',
                    total: 'Total',
                    errors: 'Errors',
                    model: {
                        fields: {
                          title: {
                            from: 'Title',
                            type: 'string'
                          },
                          description: {
                            from: 'Description',
                            type: 'string'
                          },
                          isAllDay: {
                            from: 'IsAllDay',
                            type: 'boolean'
                          },
                          start: {
                            from: 'Start',
                            type: 'date'
                          },
                          end: {
                            from: 'End',
                            type: 'date'
                          },
                          startTimezone: {
                            from: 'StartTimezone',
                            type: 'string'
                          },
                          endTimezone: {
                            from: 'EndTimezone',
                            type: 'string'
                          },
                          recurrenceRule: {
                            from: 'RecurrenceRule',
                            type: 'string'
                          },
                          recurrenceException: {
                            from: 'RecurrenceException',
                            type: 'string'
                          },
                          OwnerID: {
                            type: 'number'
                          }
                        }
                      }
                }
            }
        });
    }
}
