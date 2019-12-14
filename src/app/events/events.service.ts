import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Event } from './event.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  constructor(private http: HttpClient) { }

  fetchEvent(q = '') {
    const url = `${environment.urlApi}/events`;
    const options = {
      params: { q },
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

  updateEvent(event) {
    const url = `${environment.urlApi}/event/${event.id}`;
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

  forceDelete(id) {
    const url = `${environment.urlApi}/event/${id}/delete`;
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

  suspendedEvent(id: string) {
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

  ensureInvitation(eventId: string) {
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
      this.http.post(url, { id: eventId }, { params }).subscribe((data: any) => {
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
      this.http.post(url, null, { params }).subscribe((data: any) => {
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
    let time = new Date().getSeconds();
    return `${environment.urlApi}/event/${id}/image?token=${token}&${time}`;
  }


  fillEvents() {
    const url = `${environment.urlApi}/events/fill`;
    const params = {
      token: localStorage.getItem('token')
    };

    return new Promise((resolve, reject) => {
      this.http.post<any>(url, null, { params }).subscribe((data: any) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

}
