import { Injectable } from '@angular/core';
import { Event } from './event.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  events: Event[] = [
    {
      id: 1,
      name: 'Pizza em casa, mas fora',
      about: 'Melhor pizza do bairro, local amigável',
      briefInformation: 'Varios sabores',
      entertainment: 'Música na caixa',
      food: 'Pizza',
      price: 30,
      date: '10/10/2019',
      urlImage: 'https://baconmockup.com/640/360'
    },
    {
      id: 2,
      name: 'Burger Street',
      about: 'Melhor burguer do bairro, local amigável',
      briefInformation: 'Artesanal',
      entertainment: 'TV digital',
      food: 'Hambúrger',
      date: '10/10/2019',
      price: 30,
      urlImage: 'https://baconmockup.com/640/360'
    },
    {
      id: 3,
      name: 'Nossa Rosquinha',
      about: 'Melhor rosquinha do bairro, local amigável',
      briefInformation: 'Bem crocante',
      entertainment: 'Sport TV liberado',
      food: 'Rosquinhas',
      date: '10/10/2019',
      price: 30,
      urlImage: 'https://baconmockup.com/640/360'
    },
    {
      id: 4,
      name: 'Sorvete Gelado',
      about: 'Melhor sorvete do bairro, local amigável',
      briefInformation: 'Frutas e artificiais',
      entertainment: 'Música ao vivo (Ópera)',
      food: 'Sorvetes variádos',
      price: 30,
      date: '10/10/2019',
      urlImage: 'https://baconmockup.com/640/360'
    }
  ];
  constructor() { }

  getAllEvents() {
    return [...this.events];
  }

  
}
