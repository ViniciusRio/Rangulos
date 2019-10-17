import { Injectable } from '@angular/core';
import { Event } from './event.model';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private _events = new BehaviorSubject<Event[]>([
    new Event(
      '1',
      'Pizza em casa, mas fora',
      'Melhor pizza do bairro, local amigável',
      'Varios sabores',
      'Música na caixa',
      'Pizza',
       30,
      new Date('10-10-2019'),
      new Date('10-10-2019'),
      4,
      true,
      false,
      'https://mirepoa.com.br/wp-content/uploads/2019/04/pizza-de-liquidificador.jpg'
    ),
    new Event(
      '2',
      'Burger Street',
      'Melhor burguer do bairro, local amigável',
      'Artesanal',
      'TV digital',
      'Hambúrger',
       30,
      new Date('10-10-2019'),
      new Date('10-10-2019'),
      4,
      true,
      true,
      'https://u.tfstatic.com/restaurant_photos/169/523169/169/612/burguer-place-1-f8c95.jpg'
    ),
    new Event(
      '3',
      'Nossa Rosquinha',
      'Melhor rosquinha do bairro, local amigável',
      'Bem crocante',
      'Sport TV liberado',
      'Rosquinhas',
      30,
      new Date('10-10-2019'),
      new Date('10-10-2019'),
      4,
      false,
      true,
      'https://img.elo7.com.br/product/main/22B9825/chaveiro-rosquinhas-donuts.jpg'
    ),
    new Event(
      '4',
      'Sorvete Gelado',
      'Melhor sorvete do bairro, local amigável',
      'Frutas e artificiais',
      'Música ao vivo (Ópera)',
      'Sorvetes variádos',
      30,
      new Date('10-10-2019'),
      new Date('10-10-2019'),
      4,
      false,
      false,
      'https://estrangeira.com.br/wp-content/uploads/2016/09/Captura-de-Tela-2016-09-12-a%CC%80s-18.36.47-602x500.png'
    )
  ]);
  constructor() { }

  get events() {
    return this._events.asObservable();
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
    const newEvent = new Event(
      Math.random.toString(),
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
    return this.events.pipe(
      take(1),
      delay(1000),
      tap(events => {
        // find do evento que vou manipular
        const updateEventId = events.findIndex(event => event.id === eventId);
        // todos os eventos
        const updateEvents = [...events];
        // evento que vou manipular de fato, aqui é o obj antigo ja
        const oldEvent = updateEvents[updateEventId];
        // update de fato no objeto, substituir tudo que há
        updateEvents[updateEventId] = new Event(
          oldEvent.id,
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
          oldEvent.urlImage
        );
        // aqui de fato esta adicionando o valor no obj
        this._events.next(updateEvents);
      })
    );
  }

  // deleteEvent(eventId: string) {
  //   this.events = this.events.filter(event => {
  //     return event.id !== eventId;
  //   });
  // }
}
