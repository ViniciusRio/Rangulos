import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userAuthenticate = true;

  get userAuth() {
    return this.userAuthenticate;
  }
  constructor() { }

  login() {
    this.userAuthenticate = true;
  }

  logout() {
    this.userAuthenticate = false;
  }
}
