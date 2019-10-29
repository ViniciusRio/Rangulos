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
  getEvent(eventId: string) {

    return this.events.pipe(
      take(1),
      map(events => {
        return { ...events.find(p => p.id === eventId) };
      })
    );
  }

  addEvent(
    name: string,
    about: string,
    adicionalInformation: string,
    entertainment: string,
    food: string,
    price: number,
    startDate: Date,
    endDate: Date
  ) {
    let generateId: string;
    const newEvent = new Event(
      Math.random.toString(),
      this.authService.userId,
      name,
      about,
      adicionalInformation,
      entertainment,
      food,
      price,
      startDate,
      endDate,
      2,
      false,
      true,
      false,
      'https://estrangeira.com.br/wp-content/uploads/2016/09/Captura-de-Tela-2016-09-12-a%CC%80s-18.36.47-602x500.png'
    );
    return this.http
      .post<{ name: string }>(
        'https://rangulos-cae9a.firebaseio.com/events.json',
        {
          ...newEvent,
          id: null
        }
      )
      .pipe(
        switchMap(responseData => {
          generateId = responseData.name;
          console.log('gererateId', generateId);
          return this.events;
        }),
        take(1),
        tap(events => {
          newEvent.id = generateId;
          this._events.next(events.concat(newEvent));
        })
      );
    // return this.events.pipe(
    //   take(1),
    //   delay(1000),
    //   tap(events => {
    //     this._events.next(events.concat(newEvent));
    //   })
    // );
  }

  addCurrentEvent(
    name: string,
    about: string,
    adicionalInformation: string,
    entertainment: string,
    food: string,
    price: number,
    startDate: Date,
    endDate: Date
  ) {
    const newEvent = new Event(
      Math.random.toString(),
      this.authService.userId,
      name,
      about,
      adicionalInformation,
      entertainment,
      food,
      price,
      startDate,
      endDate,
      2,
      false,
      false,
      true,
      'https://estrangeira.com.br/wp-content/uploads/2016/09/Captura-de-Tela-2016-09-12-a%CC%80s-18.36.47-602x500.png'
    );

    return this.events.pipe(
      take(1),
      delay(1000),
      tap(events => {
        this._events.next(events.concat(newEvent));
      })
    );
  }

  updateEvent(
    eventId: string,
    name: string,
    about: string,
    adicionalInformation: string,
    entertainment: string,
    food: string,
    price: number,
    startDate: Date,
    endDate: Date
  ) {
    // variavel para ser usada fora do metodoswitchmap
    let updatedEvents: Event[];
    return this.events.pipe(
      take(1),
      switchMap(events => {
        if (!events || events.length <= 0) {
          return this.fetchEvent();
        } else {
          return of(events);
        }
      }),
      switchMap(events => {
        const updatedEventIndex = events.findIndex(event => event.id === eventId);
        updatedEvents = [...events];
        const oldEvent = updatedEvents[updatedEventIndex];
        updatedEvents[updatedEventIndex] = new Event(
          oldEvent.id,
          oldEvent.userId,
          name,
          about,
          adicionalInformation,
          entertainment,
          food,
          +price,
          new Date(startDate),
          new Date(endDate),
          oldEvent.numberGuests,
          oldEvent.verifiedPayment,
          oldEvent.iCreated,
          oldEvent.currentEvent,
          oldEvent.urlImage
        );
        return this.http.put(
          // variave na ur para dizer qua vai suistituir
          `https://rangulos-cae9a.firebaseio.com/events/${eventId}.json`,
        // cópia do objeto inteiro, menos o id, que esta como null, pq ja tem o id do Fire
          { ...updatedEvents[updatedEventIndex], id: null }
        );
      }),
      tap(() => {
        this._events.next(updatedEvents);
      })
    );
  }

  deleteEvent(eventId: string) {
    return this.http.delete(`https://rangulos-cae9a.firebaseio.com/events/${eventId}.json`)
    .pipe(
      switchMap(() => {
        return this.events;
      }),
      take(1),
      tap(events => {
        this._events.next(events.filter(event => event.id !== eventId));
      })
    );

    // return this.events.pipe(
    //   take(1),
    //   delay(1000),
    //   tap(events => {
    //     this._events.next(events.filter(event => event.id !== eventId));
    //   })
    // );
  }
}
