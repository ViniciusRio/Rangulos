import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userAuthenticate;
  // tslint:disable-next-line: variable-name
  local = null;

  get userAuth() {
    return this.userAuthenticate;
  }

  constructor(private http: HttpClient) {
    this.local = localStorage.getItem('token');

    if(this.local != null) {
      this.userAuthenticate = true;
    } else {
      this.userAuthenticate = false;
    }
   }

  login(credentials) {
    const url = `${environment.urlApi}/login`;

    return new Promise((resolve, reject) => {
      this.http.post(url, credentials).subscribe((data: any) => {
        if (data.hasOwnProperty('token')) {
          localStorage.setItem('token', data.token);
          this.userAuthenticate = true;
        }
        this.userAuthenticate = true;
        resolve(data);

      }, (err) => {
        this.userAuthenticate = false;
        reject(err);
      });
    });
  }

  user() {
    const url = `${environment.urlApi}/user`;
    const params = {
      token: localStorage.getItem('token')
    };
    return new Promise((resolve, reject) => {
      this.http.get(url, { params }).subscribe((data: any) => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });
  }

  logout() {
    this.userAuthenticate = false;
    const url = `${environment.urlApi}/logout`;
    const params = {
      token: localStorage.getItem('token')
    };
    return new Promise((resolve, reject) => {
      this.http.get(url, { params }).subscribe((data: any) => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });

  }

  register(credentials) {
    const url = `${environment.urlApi}/register`;

    return new Promise((resolve, reject) => {
      this.http.post(url, credentials).subscribe((data: any) => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });
  }
}
