import { FormGroup } from '@angular/forms';
import { EventData } from 'src/app/shared/models/event-data';


export class AppCalenderListModel {
    form: FormGroup;
    eventData: EventData[];
}
