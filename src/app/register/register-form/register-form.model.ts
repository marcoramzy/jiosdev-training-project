import { FormGroup } from '@angular/forms';

export class AppRegisterFormModel {
    form: FormGroup;
    countries: any;
    defaultCountryId: number;
    hide = true;
    disableBtn = false;
}
