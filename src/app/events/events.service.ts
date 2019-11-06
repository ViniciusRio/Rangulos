import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Event } from './event.model';
import { BehaviorSubject, of } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';


interface EventData {
  about: string;
  adicionalInformation: string;
  currentEvent: boolean;
  endDate: string;
  userId;
  entertainment: string;
  food: string;
  iCreated: boolean;
  name: string;
  numberGuests: number;
  price: number;
  startDate: string;
  urlImage: string;
  verifiedPayment: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private _events = new BehaviorSubject<Event[]>([]);

  constructor(private authService: AuthService, private http: HttpClient) { }

  get events() {
    return this._events.asObservable();
  }

    fetchEvent() {
      return this.http
      .get<{[ key: string]: EventData }>('https://rangulos-cae9a.firebaseio.com/events.json')
      .pipe(map(resultData => {
        const events = [];
        for (const key in resultData) {
          if (resultData.hasOwnProperty(key)) {
            events.push(new Event(
              key,
              resultData[key].userId,
              resultData[key].name,
              resultData[key].about,
              resultData[key].adicionalInformation,
              resultData[key].entertainment,
              resultData[key].food,
              +resultData[key].price,
              new Date(resultData[key].startDate),
              new Date(resultData[key].endDate),
              +resultData[key].numberGuests,
              resultData[key].verifiedPayment,
              resultData[key].iCreated,
              resultData[key].currentEvent,
              resultData[key].urlImage
            ));
          }
        }
        return events;
      }),
      tap(events => {
        this._events.next(events);
      })
    );
  }
  getEvent(id: string) {

    const url = `${environment.urlApi}/event/${id}`;
    console.log(id);
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

  addEvent(
    title: string,
    about: string,
    address: string,
    price: number,
    maxGuests: number,
    startDate: Date,
    endDate: Date
  ) {
    const newEvent = new Event(
      Math.random().toString(),
      title,
      about,
      address,
      price,
      maxGuests,
      startDate,
      endDate,
      'https://estrangeira.com.br/wp-content/uploads/2016/09/Captura-de-Tela-2016-09-12-a%CC%80s-18.36.47-602x500.png',
      null
    );

    // const url = `${environment.urlApi}/event/current`;
    const url = `${environment.urlApi}/events?token=${localStorage.getItem('token')}`;
    const params = {
      // token: localStorage.getItem('token'),
      newEvent,
      // title: newEvent.title,
      // about: newEvent.about,
      // address: newEvent.address,
      // price: newEvent.price,
      // maxGuests: newEvent.max_guests,
      // startDate: newEvent.start_date,
      // endDate: newEvent.end_date,
      // url_image: 'https://estrangeira.com.br/wp-content/uploads/2016/09/Captura-de-Tela-2016-09-12-a%CC%80s-18.36.47-602x500.png',
      // user_creator_id: null
    };
    console.log(newEvent);
    return new Promise((resolve, reject) => {
      this.http.post(url, { params }).subscribe((data: any) => {
        resolve(data);
      }, (err) => {
        reject(err);
      });
    });
  }
    // return this.events.pipe(
    //   take(1),
    //   delay(1000),
    //   tap(events => {
    //     this._events.next(events.concat(newEvent));
    //   })
    // );
  // }

  // addCurrentEvent(
  //   name: string,
  //   about: string,
  //   adicionalInformation: string,
  //   entertainment: string,
  //   food: string,
  //   price: number,
  //   startDate: Date,
  //   endDate: Date
  // ) {
  //   const newEvent = new Event(
  //     Math.random.toString(),
  //     this.authService.userId,
  //     name,
  //     about,
  //     adicionalInformation,
  //     entertainment,
  //     food,
  //     price,
  //     startDate,
  //     endDate,
  //     2,
  //     false,
  //     false,
  //     true,
  //     'https://estrangeira.com.br/wp-content/uploads/2016/09/Captura-de-Tela-2016-09-12-a%CC%80s-18.36.47-602x500.png'
  //   );

  //   return this.events.pipe(
  //     take(1),
  //     delay(1000),
  //     tap(events => {
  //       this._events.next(events.concat(newEvent));
  //     })
  //   );
  // }

  // updateEvent(
  //   eventId: string,
  //   name: string,
  //   about: string,
  //   adicionalInformation: string,
  //   entertainment: string,
  //   food: string,
  //   price: number,
  //   startDate: Date,
  //   endDate: Date
  // ) {
  //   // variavel para ser usada fora do metodoswitchmap
  //   let updatedEvents: Event[];
  //   return this.events.pipe(
  //     take(1),
  //     switchMap(events => {
  //       if (!events || events.length <= 0) {
  //         return this.fetchEvent();
  //       } else {
  //         return of(events);
  //       }
  //     }),
  //     switchMap(events => {
  //       const updatedEventIndex = events.findIndex(event => event.id === eventId);
  //       updatedEvents = [...events];
  //       const oldEvent = updatedEvents[updatedEventIndex];
  //       updatedEvents[updatedEventIndex] = new Event(
  //         oldEvent.id,
  //         oldEvent.userId,
  //         name,
  //         about,
  //         adicionalInformation,
  //         entertainment,
  //         food,
  //         +price,
  //         new Date(startDate),
  //         new Date(endDate),
  //         oldEvent.numberGuests,
  //         oldEvent.verifiedPayment,
  //         oldEvent.iCreated,
  //         oldEvent.currentEvent,
  //         oldEvent.urlImage
  //       );
  //       return this.http.put(
  //         // variave na ur para dizer qua vai suistituir
  //         `https://rangulos-cae9a.firebaseio.com/events/${eventId}.json`,
  //       // cópia do objeto inteiro, menos o id, que esta como null, pq ja tem o id do Fire
  //         { ...updatedEvents[updatedEventIndex], id: null }
  //       );
  //     }),
  //     tap(() => {
  //       this._events.next(updatedEvents);
  //     })
  //   );
  // }

  deleteGuest(id: string) {
    // const url = `${environment.urlApi}/event/current`;
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
}
