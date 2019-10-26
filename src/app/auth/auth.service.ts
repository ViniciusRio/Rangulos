import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userAuthenticate = true;
  // tslint:disable-next-line: variable-name
  private _userId = 'xyz';

  get userAuth() {
    return this.userAuthenticate;
  }

  get userId() {
    return this._userId;
  }

  constructor() { }

  login() {
    this.userAuthenticate = true;
  }

  logout() {
    this.userAuthenticate = false;
  }
}
