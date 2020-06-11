import { FormGroup } from '@angular/forms';
import { PeopleData } from 'src/app/shared/models/people-data';


export class AppPeopleViewDialogModel {
    form: FormGroup;
    formSubmitted = false;
    peopleData: PeopleData = {} as PeopleData;
    personName: string;
    fromGroupsPage = false;
    groupsExists = false;
    personId: number;
}
