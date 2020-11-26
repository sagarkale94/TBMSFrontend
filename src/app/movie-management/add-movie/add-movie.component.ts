import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UiService } from 'src/app/services/ui.service';
import { AppService } from 'src/app/services/app.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/login/login.component';
import { MovieManagementService } from '../services/movie-management.service';
import { ERR_CODE_SUCCESS, ERR_CODE_NO_RECORD, ERR_CODE_ERROR, API_ERR_MESSAGE, ACTION_ADD, ACTION_EDIT } from 'src/app/app.constant';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  movieFormGroup: FormGroup = null;
  isDialogOpenedForActionAdd: boolean = true;

  constructor(
    private uiService: UiService,
    private movieManagementService: MovieManagementService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogInjectedData: any
  ) { }

  ngOnInit(): void {
    if (this.dialogInjectedData.action == ACTION_EDIT) {
      this.getMovieDetailsByMovieId(this.dialogInjectedData.movieId);
      this.isDialogOpenedForActionAdd = false;
    }
    this.createMovieFormGroup();
  }

  getMovieDetailsByMovieId(movieId) {
    this.movieManagementService.getMovieDetails(movieId).subscribe(
      resp => {
        if (resp.errCode == ERR_CODE_SUCCESS) {
          this.movieFormGroup.controls['name'].setValue(resp.data.name);
          this.movieFormGroup.controls['description'].setValue(resp.data.description);
          this.movieFormGroup.controls['posterUrl'].setValue(resp.data.posterUrl);
        } else if (resp.errCode == ERR_CODE_NO_RECORD || resp.errCode == ERR_CODE_ERROR) {
          this.uiService.showSnackbar(resp.message);
        }
      },
      err => {
        this.uiService.showSnackbar(API_ERR_MESSAGE);
      });
  }

  createMovieFormGroup() {
    this.movieFormGroup = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      posterUrl: ['', [Validators.required]],
    });
  }

  onCloseIconClick() {
    this.dialogRef.close({ success: false });
  }

  onAddBtnClick() {
    if (this.movieFormGroup.dirty && this.movieFormGroup.valid) {
      let body = {
        name: this.movieFormGroup.value.name,
        description: this.movieFormGroup.value.description,
        posterUrl: this.movieFormGroup.value.posterUrl,
      }
      if (this.isDialogOpenedForActionAdd) {
        this.addMovie(body);
      } else {
        this.updateMovie(body);
      }
    }
  }

  addMovie(body) {
    this.movieManagementService.addMovie(body).subscribe(
      resp => {
        if (resp.errCode == ERR_CODE_SUCCESS) {
          this.uiService.showSnackbar(resp.message);
          this.dialogRef.close({ success: true });
        } else if (resp.errCode == ERR_CODE_NO_RECORD || resp.errCode == ERR_CODE_ERROR) {
          this.uiService.showSnackbar(resp.message);
        }
      },
      err => {
        this.uiService.showSnackbar(API_ERR_MESSAGE);
      });
  }

  updateMovie(body) {
    this.movieManagementService.updateMovie(body, this.dialogInjectedData.movieId).subscribe(
      resp => {
        if (resp.errCode == ERR_CODE_SUCCESS) {
          this.uiService.showSnackbar(resp.message);
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
