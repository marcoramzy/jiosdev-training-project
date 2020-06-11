import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

export class AppDashboardModel {

    destroyed = new Subject();
    ChurchServiceCards: any[];
    ProgressCards: any[];
}
