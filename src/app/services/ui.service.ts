import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private snackbar: MatSnackBar) { }

  showSnackbar(message: string) {
    this.snackbar.open(message, '', { duration: 4000, panelClass: ['app-snackbar'] });
  }

}
