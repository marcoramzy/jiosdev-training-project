import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RegisterService } from '../register.service';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  form: FormGroup;
  countries: any;
  defaultCountryId: number;
  hide = true;
  @Input() isDemo;
  disableBtn = false;

  get passwordInput() { return this.form.get('password'); }

  constructor(private fb: FormBuilder, private registerService: RegisterService , private router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {

    if (this.isDemo) {
      this.form = this.fb.group({
        CountryId: [6],
        FirstName: [[], [Validators.required]],
        SecondName: [[], [Validators.required]],
        IsDemo: [this.isDemo],
        LoginUserPassword: [[], [Validators.required, Validators.minLength(6)]],
        MeetingName: ['Demo'],
        Mobile: [],
        LoginUserEmail: [[], [Validators.email, Validators.required], this.validateNameViaServer.bind(this)],
      });
    }
    else {
      this.registerService.getCountries().subscribe((value) => {
        console.log('Countries', value);
        this.countries = value;
        this.defaultCountryId = value.filter(country => country.IsDefault === true)[0].Key;
        this.form.patchValue({
          CountryId: this.defaultCountryId
        });
      });
      this.form = this.fb.group({
        CountryId: [],
        FirstName: [[], [Validators.required]],
        SecondName: [[], [Validators.required]],
        IsDemo: [this.isDemo],
        LoginUserPassword: [[], [Validators.required, Validators.minLength(6)]],
        MeetingName: [[], [Validators.required]],
        Mobile: [null, [Validators.pattern('^[0-9]*'), Validators.minLength(10)]],
        LoginUserEmail: [[], [Validators.email, Validators.required], this.validateNameViaServer.bind(this)],
      });
    }

  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  validateNameViaServer({ value }: AbstractControl): Observable<ValidationErrors | null> {
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
    this.disableBtn = true;
    const { value, valid } = this.form;
    if (valid) {
      if (value.Mobile === ''){
        value.Mobile = null;
      }
      console.log('value', value);
      this.registerService.register(value).subscribe(
        res => {
            console.log('res', res);
            if ( res?.Token){
              this.router.navigate(['/dashboard']);
            }
            this.disableBtn = false;
        },
        error => {
          this.disableBtn = false;
        }
      );
    }
    else{
      this.disableBtn = false;
    }
  }


}
