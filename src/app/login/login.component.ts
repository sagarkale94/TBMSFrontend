import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl, FormControl } from '@angular/forms';
import { AppService } from '../services/app.service';
import { ERR_CODE_SUCCESS, ERR_CODE_NO_RECORD, ERR_CODE_ERROR, API_ERR_MESSAGE } from '../app.constant';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide: boolean = true;
  loginFormGroup: FormGroup;
  signUpFormGroup: FormGroup;
  selected = new FormControl(0);

  constructor(
    private uiService: UiService,
    private appService: AppService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LoginComponent>
  ) { }

  ngOnInit(): void {
    this.createLoginFormGroup();
  }

  createLoginFormGroup() {
    this.loginFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    this.signUpFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required, this.matchValues('password'),]]
    });
  }

  matchValues(
    matchTo: string // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };
  }

  onLoginBtnClick() {
    if (this.loginFormGroup.dirty && this.loginFormGroup.valid) {
      this.appService.login(this.loginFormGroup.value.email, this.loginFormGroup.value.password).subscribe(
        resp => {
          if (resp.errCode == ERR_CODE_SUCCESS) {
            this.uiService.showSnackbar(resp.message);
            localStorage.setItem('tbms-data', JSON.stringify(resp.data));
            this.dialogRef.close({ success: true });
          } else if (resp.errCode == ERR_CODE_NO_RECORD || resp.errCode == ERR_CODE_ERROR) {
            this.uiService.showSnackbar(resp.message);
          }
        },
        err => {
          this.uiService.showSnackbar(API_ERR_MESSAGE);
        });
    }
  }

  onSignUpBtnClick() {
    if (this.signUpFormGroup.dirty && this.signUpFormGroup.valid) {
      if (this.signUpFormGroup.value.password == this.signUpFormGroup.value.confirmPassword) {
        this.appService.signUp(this.signUpFormGroup.value.email, this.signUpFormGroup.value.password).subscribe(
          resp => {
            if (resp.errCode == ERR_CODE_SUCCESS) {
              this.uiService.showSnackbar(resp.message);
              this.changeTab(0);
              this.signUpFormGroup.reset();
            } else if (resp.errCode == ERR_CODE_NO_RECORD || resp.errCode == ERR_CODE_ERROR) {
              this.uiService.showSnackbar(resp.message);
            }
          },
          err => {
            this.uiService.showSnackbar(API_ERR_MESSAGE);
          });
      } else {
        this.uiService.showSnackbar("Password and confirm password should match..!!");
      }
    }
  }

  changeTab(index) {
    this.selected.setValue(index);
  }

  onCloseIconClick() {
    this.dialogRef.close({ success: false });
  }

}
