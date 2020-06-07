import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RegisterService } from '../register.service';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppRegisterFormModel } from './register-form.model';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  model: AppRegisterFormModel;

  @Input() isDemo;

  constructor(private fb: FormBuilder, private registerService: RegisterService, private router: Router) {
    this.initModel();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {

    if (this.isDemo) {
      this.setupForm( this.isDemo);
    }
    else {
      this.getCountries();
      this.setupForm( this.isDemo);
    }

  }

  setupForm(isDemo: boolean) {
    this.model.form = this.fb.group({
      CountryId: isDemo ? [6] : [],
      FirstName: [[], [Validators.required]],
      SecondName: [[], [Validators.required]],
      IsDemo: [isDemo],
      LoginUserPassword: [[], [Validators.required, Validators.minLength(6)]],
      MeetingName: isDemo ? ['Demo'] : [[], [Validators.required]],
      Mobile: isDemo ? [] : [null, [Validators.pattern('^[0-9]*'), Validators.minLength(10)]],
      LoginUserEmail: [[], [Validators.email, Validators.required], this.validateEmailViaServer.bind(this)],
    });
  }

  getCountries() {
    this.registerService.getCountries().subscribe((value) => {
      console.log('Countries', value);
      this.model.countries = value;
      this.model.defaultCountryId = value.filter(country => country.IsDefault === true)[0].Key;
      this.model.form.patchValue({
        CountryId: this.model.defaultCountryId
      });
    });
  }

  validateEmailViaServer({ value }: AbstractControl): Observable<ValidationErrors | null> {
    return this.registerService.isEmailAvailable(value)
      .pipe(debounceTime(500), map((emailAvailable: boolean) => {
        if (!emailAvailable) {
          return {
            isAlreadyExists: true
          };
        }
        return null;
      }));
  }

  onSaveClick() {
    this.model.disableBtn = true;
    const { value, valid } = this.model.form;
    if (valid) {
      if (value.Mobile === '') {
        value.Mobile = null;
      }
      console.log('value', value);
      this.registerService.register(value).subscribe(
        res => {
          console.log('res', res);
          if (res?.Token) {
            this.router.navigate(['/dashboard']);
          }
          this.model.disableBtn = false;
        },
        error => {
          this.model.disableBtn = false;
        }
      );
    }
    else {
      this.model.disableBtn = false;
    }
  }

  private initModel() {
    this.model = new AppRegisterFormModel();
  }

}
