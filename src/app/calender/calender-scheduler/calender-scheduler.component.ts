import { Component, OnInit } from '@angular/core';
import { CalenderService } from '../calender.service';
@Component({
    selector: 'app-calender-scheduler',
    templateUrl: './calender-scheduler.component.html',
    styleUrls: ['./calender-scheduler.component.scss']
})
export class CalenderSchedulerComponent implements OnInit {

    constructor(private calenderService: CalenderService) {
    }

    ngOnInit(): void {
        this.setupScheduler();
    }

    setupScheduler() {
        function schedulerUpdateDatasource() {
            const scheduler = $('#scheduler').data('kendoScheduler') as any;
            setTimeout(() => {
                scheduler.dataSource.read();
            }, 10);
        }

        function getStartDate() {
            const scheduler = $('#scheduler').data('kendoScheduler');
            const view = scheduler.view() as any;
            return kendo.format('{0:d}', view.startDate());
        }

        function getEndDate() {
            const scheduler = $('#scheduler').data('kendoScheduler');
            const view = scheduler.view() as any;
            return kendo.format('{0:d}', view.endDate());
        }

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
                  schedulerUpdateDatasource();
            },
            dataSource: {
                batch: true,
                transport: {
                    read(options) {
                        $.ajax({
                            url: 'https://api-stage.chmeetings.com/35666DC28224AFCA/Public/Calendar/Events?start=' +
                            getStartDate() + '&end=' + getEndDate(),
                            dataType: 'json',
                            data: {
                                models: kendo.stringify(options.data.models)
                            },
                            success(result) {
                                options.success(result.Data);
                            }
                        });
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
