import { Injectable } from '@angular/core';
import { Event } from './event.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  events: Event[] = [
    {
      id: '1',
      name: 'Pizza em casa, mas fora',
      about: 'Melhor pizza do bairro, local amigável',
      adicionalInformation: 'Varios sabores',
      entertainment: 'Música na caixa',
      food: 'Pizza',
      price: 30,
      date: '10/10/2019',
      numberGuests: 4,
      verifiedPayment: true,
      iCreated: false,
      urlImage: 'https://mirepoa.com.br/wp-content/uploads/2019/04/pizza-de-liquidificador.jpg'
    },
    {
      id: '2',
      name: 'Burger Street',
      about: 'Melhor burguer do bairro, local amigável',
      adicionalInformation: 'Artesanal',
      entertainment: 'TV digital',
      food: 'Hambúrger',
      price: 30,
      date: '10/10/2019',
      numberGuests: 4,
      verifiedPayment: true,
      iCreated: true,
      urlImage: 'https://u.tfstatic.com/restaurant_photos/169/523169/169/612/burguer-place-1-f8c95.jpg'
    },
    {
      id: '3',
      name: 'Nossa Rosquinha',
      about: 'Melhor rosquinha do bairro, local amigável',
      adicionalInformation: 'Bem crocante',
      entertainment: 'Sport TV liberado',
      food: 'Rosquinhas',
      price: 30,
      date: '10/10/2019',
      numberGuests: 4,
      verifiedPayment: false,
      iCreated: true,
      urlImage: 'https://img.elo7.com.br/product/main/22B9825/chaveiro-rosquinhas-donuts.jpg'
    },
    {
      id: '4',
      name: 'Sorvete Gelado',
      about: 'Melhor sorvete do bairro, local amigável',
      adicionalInformation: 'Frutas e artificiais',
      entertainment: 'Música ao vivo (Ópera)',
      food: 'Sorvetes variádos',
      price: 30,
      date: '10/10/2019',
      numberGuests: 4,
      verifiedPayment: false,
      iCreated: false,
      urlImage: 'https://estrangeira.com.br/wp-content/uploads/2016/09/Captura-de-Tela-2016-09-12-a%CC%80s-18.36.47-602x500.png'
    }
  ];
  constructor() { }

  getAllEvents() {
    return [...this.events];
  }
  getEvent(eventId: string) {
    return {
        ...this.events.find(event => {
        return event.id === eventId;
      })
    };
  }
}
