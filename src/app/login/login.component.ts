import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  onCloseIconClick() {
    this.dialogRef.close({ success: false });
  }

}
