import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// to decode the token of user data
import jwtDecode from 'jwt-decode';
// BehaviorSubject used to watch contenously
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    // to keep user logged in while making refresh
    if (localStorage.getItem('userToken') != null) {
      this.saveUserData();
    }
  }

  // userData of type of BehaviorSubject to make data listen in all project
  userData = new BehaviorSubject(null);

  saveUserData() {
    let encodedUserData = JSON.stringify(localStorage.getItem('userToken'));
    this.userData.next(jwtDecode(encodedUserData));
  }

  logOut() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._Router.navigate(['/login']);
  }

  signUp(formData: object): Observable<any> {
    return this._HttpClient.post(
      `https://routeegypt.herokuapp.com/signup`,
      formData
    );
  }

  signIn(formData: object): Observable<any> {
    return this._HttpClient.post(
      `https://routeegypt.herokuapp.com/signin`,
      formData
    );
  }
}
