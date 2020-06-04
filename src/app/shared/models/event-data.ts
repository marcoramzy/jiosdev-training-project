export interface EventData {
    Title: string;
    Description: string;
    IsAllDay: boolean;
    Start: string;
    End: string;
    StartTimezone: string;
    EndTimezone: string;
    RecurrenceRule: string;
    RecurrenceException: string;
    OwnerID: number;
    TaskId: number;
}

