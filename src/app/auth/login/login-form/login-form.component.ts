import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppLoginFormModel } from './login-form.model';
import { StorageService } from 'src/app/core/services/storage.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  model: AppLoginFormModel;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private storageService: StorageService) {
    this.initModel();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {

      this.setupForm();

  }

  setupForm() {
    this.model.form = this.fb.group({
      UserName: [[], [Validators.email, Validators.required]],
      Password: [[], [Validators.required, Validators.minLength(6)]],
    });
  }

  onSaveClick() {
    this.model.disableBtn = true;
    const { value, valid } = this.model.form;
    if (valid) {
      if (value.Mobile === '') {
        value.Mobile = null;
      }
      console.log('value', value);
      this.authService.login(value).subscribe(
        res => {
          console.log('res', res);
          if (res?.Type === 'success') {
            this.storageService.set('church_service_id', res.ResultData.ChurchServiceId);

            this.authService.setNewToken(JSON.parse(res.ResultData.Token));

            this.router.navigate(['/dashboard']);
          }
          if (res?.Type === 'modelStateError'){
              this.model.errorMsg = res.ResultData[0];
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

  goToSignUpForm(){
    this.router.navigate(['/Account/Register']);
  }

  private initModel() {
    this.model = new AppLoginFormModel();
  }

}
