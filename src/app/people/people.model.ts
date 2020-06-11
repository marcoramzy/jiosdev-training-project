import { FormGroup } from '@angular/forms';
import { PeopleData } from '../shared/models/people-data';
import { Subject } from 'rxjs';


export class AppPeopleModel {
    destroyed = new Subject();
    isPeoplePage = true;
    peopleData: PeopleData = {} as PeopleData;
    peopleDataSource: PeopleData[];
}
