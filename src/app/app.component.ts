import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { ROLE_TYPE_ADMIN } from './app.constant';
import { Router } from '@angular/router';
import { UiService } from './services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'TBMSFrontend';
  isAdmin = false;
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public dialog: MatDialog,
    private router: Router,
    private uiService: UiService,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.checkIsAdminLoggedIn();
  }

  checkIsAdminLoggedIn() {
    let tbmsData: any = localStorage.getItem('tbms-data');
    if (tbmsData != null) {
      tbmsData = JSON.parse(tbmsData);
      if (tbmsData.role && tbmsData.role == ROLE_TYPE_ADMIN) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    } else {
      this.isAdmin = false;
    }
  }

  onLogInBtnClick() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '70%',
      height: '70%',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        this.checkIsAdminLoggedIn();
      }
    });
  }

  checkIsUserLoggedIn() {
    let tbmsData: any = localStorage.getItem('tbms-data');
    if (tbmsData != null) {
      tbmsData = JSON.parse(tbmsData);
      if ("token" in tbmsData) {
        return true;
      }
    }
    return false;
  }

  onLogoutBtnClick() {
    localStorage.clear();
    this.checkIsAdminLoggedIn();
    this.router.navigate(['/movies']);
    this.uiService.showSnackbar("Logged out successfully..!!")
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
