import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Event } from './event.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  constructor(private http: HttpClient) { }

  fetchEvent() {
    const url = `${environment.urlApi}/events`;
    const params = {
      token: localStorage.getItem('token')
    };

    return new Promise((resolve, reject) => {
      this.http.get(url, { params }).subscribe((data: any) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  getEvent(id: string) {

    const url = `${environment.urlApi}/event/${id}`;
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

  getPastEvents() {
    const url = `${environment.urlApi}/events/past`;
    const params = {
      token: localStorage.getItem('token')
    };

    return new Promise((resolve, reject) => {
      this.http.get(url, { params }).subscribe((data: any) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  getMyEvents() {
    const url = `${environment.urlApi}/events/my`;
    const params = {
      token: localStorage.getItem('token')
    };

    return new Promise((resolve, reject) => {
      this.http.get(url, { params }).subscribe((data: any) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  getCurrent() {
    const url = `${environment.urlApi}/event/current`;
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

  addEvent(newEvent) {
    // const url = `${environment.urlApi}/event/current`;
    const url = `${environment.urlApi}/events`;
    const params = {
      token: localStorage.getItem('token')
    };
    return new Promise((resolve, reject) => {
      this.http.post(url, newEvent, { params }).subscribe((data: any) => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });
  }

  updateEvent(
    id: string,
    title: string,
    about: string,
    address: string,
    price: number,
    // tslint:disable-next-line: variable-name
    max_guests: number,
    // tslint:disable-next-line: variable-name
    start_date: Date,
    // tslint:disable-next-line: variable-name
    end_date: Date
  ) {
    const event = new Event(
      id,
      title,
      about,
      address,
      price,
      max_guests,
      start_date,
      end_date,
      'https://estrangeira.com.br/wp-content/uploads/2016/09/Captura-de-Tela-2016-09-12-a%CC%80s-18.36.47-602x500.png',
      null
    );
    const url = `${environment.urlApi}/event/${id}`;
    const params = {
      token: localStorage.getItem('token')
    };
    return new Promise((resolve, reject) => {
      this.http.put(url, event, { params }).subscribe((data: any) => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });
  }

  deleteGuest(id: string) {
    const url = `${environment.urlApi}/guest/${id}`;
    const params = {
      token: localStorage.getItem('token')
    };

    return new Promise((resolve, reject) => {
      this.http.delete(url, { params }).subscribe((data: any) => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });
  }

  deleteEvent(id: string) {
    const url = `${environment.urlApi}/event/${id}`;
    const params = {
      token: localStorage.getItem('token')
    };

    return new Promise((resolve, reject) => {
      this.http.delete(url, { params }).subscribe((data: any) => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });
  }
}
