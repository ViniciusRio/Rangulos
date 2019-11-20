import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Event } from './event.model';
import { HttpClient } from '@angular/common/http';
import { resolve } from 'url';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  constructor(private http: HttpClient) { }

  fetchEvent() {
    const url = `${environment.urlApi}/events`;
    const options = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };

    return new Promise((resolve, reject) => {
      this.http.get(url, options).subscribe((data: any) => {
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

  getCurrentEvents() {
    const url = `${environment.urlApi}/events/current`;
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

  ensureInvitation(
   eventId: string
    ) {
    const url = `${environment.urlApi}/guest/${eventId}`;
    const params = {
      token: localStorage.getItem('token')
    };

    return new Promise((resolve, reject) => {
      this.http.post(url, eventId, { params }).subscribe((data: any) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  payEvent(eventId: string) {
    const url = `${environment.urlApi}/event/pay`;
    const params = {
      token: localStorage.getItem('token')
    };

    return new Promise((resolve, reject) => {
      this.http.post(url, {id: eventId}, { params }).subscribe((data: any) => {
        resolve(data);
      }, (error) => {
        reject(error);
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

  rate(id, value) {
    const url = `${environment.urlApi}/guest/${id}/rate`;
    const params = {
      token: localStorage.getItem('token')
    };

    return new Promise((resolve, reject) => {
      this.http.post(url, { rate: value }, { params }).subscribe((data: any) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  restore(id) {
    const url = `${environment.urlApi}/event/${id}/restore`;
    const params = {
      token: localStorage.getItem('token')
    };

    return new Promise((resolve, reject) => {
      this.http.post(url, null, {params}).subscribe((data: any) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  uploadImage(id, formData) {
    const url = `${environment.urlApi}/event/${id}/upload`;
    const params = {
      token: localStorage.getItem('token')
    };

    return new Promise((resolve, reject) => {
      this.http.post<any>(url, formData, { params }).subscribe((data: any) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  getImage(id) {
    let token = localStorage.getItem('token');
    let time = new Date().getMilliseconds();
    return `${environment.urlApi}/event/${id}/image?token=${token}&${time}`;
  }
}
