import { FormGroup } from '@angular/forms';

export class AppLoginFormModel {
    form: FormGroup;
    hidePass = true;
    disableBtn = false;
    errorMsg: string;
}
