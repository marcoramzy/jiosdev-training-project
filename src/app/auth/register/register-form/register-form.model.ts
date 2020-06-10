import { FormGroup } from '@angular/forms';

export class AppRegisterFormModel {
    form: FormGroup;
    countries: any;
    defaultCountryId: number;
    hidePass = true;
    disableBtn = false;
}
