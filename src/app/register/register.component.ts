import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  ngOnInit(): void {}

  loading: boolean = false;
  error: string = '';

  registerForm: FormGroup = new FormGroup({
    first_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    last_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^.{5,15}$/),
    ]),
  });

  submitRegisterForm(registerForm: FormGroup) {
    if (registerForm.invalid) {
      this.loading = true;
      return;
    } else {
      this._AuthService.signUp(registerForm.value).subscribe((response) => {
        if (response.message == 'success') {
          this.loading = false;
          this._Router.navigate(['/login']);
        } else {
          this.error = response.errors.email.message;
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        }
      });
    }
    this.registerForm.reset();
  }
}
