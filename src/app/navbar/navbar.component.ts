import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  userDetails: any = {};
  constructor(
    private _AuthService: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    // this method used to watch userData contenously
    this._AuthService.userData.subscribe(() => {
      if (this._AuthService.userData.getValue() != null) {
        this.isLogin = true;
        this.userDetails = this._AuthService.userData.value;
      } else {
        this.isLogin = false;
      }
    });
  }

  logOut() {
    this._AuthService.logOut();
    this.userDetails = {};
  }
}
