export interface EventData {
    Title: string;
    Description: string;
    IsAllDay: boolean;
    Start: Date;
    End: Date;
    StartTimezone: string;
    EndTimezone: string;
    RecurrenceRule: string;
    RecurrenceException: string;
    OwnerID: number;
    TaskId: number;
}

