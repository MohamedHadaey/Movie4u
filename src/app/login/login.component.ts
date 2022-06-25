import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private toastr: ToastrService
  ) {}

  loading: boolean = false;
  error: string = '';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^.{5,15}$/),
    ]),
  });

  submitLoginForm(loginForm: FormGroup) {
    if (loginForm.valid) {
      this._AuthService.signIn(loginForm.value).subscribe((response) => {
        if (response.message == 'success') {
          localStorage.setItem('userToken', response.token);
          this._AuthService.saveUserData();
          this.toastr.success('Success');
          this._Router.navigate(['/home']);
        } else {
          this.toastr.error(response.message, 'Failed');
          this.error = response.errors.email.message;
        }
      });
    }
    this.loginForm.reset();
  }

  ngOnInit(): void { }
}
