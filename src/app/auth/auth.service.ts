import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


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

  constructor(private http: HttpClient) { }

  login(credentials) {
    const url = `${environment.urlApi}/login`;

    return new Promise((resolve, reject) => {
      this.http.post(url, credentials).subscribe((data: any) => {
        if (data.hasOwnProperty('token')) {
          localStorage.setItem('token', data.token);
          this.userAuthenticate = true;
        }
        resolve(data);
      }, (err) => {
        this.userAuthenticate = false;
        reject(err);
      });
    });
  }

  logout() {
    this.userAuthenticate = false;
  }
}
