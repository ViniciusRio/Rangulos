import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  events = [];

  constructor() {
    this.events = [
      {
        id: 1,
        name: 'Pizza em casa, mas fora',
        about: 'Melhor pizza do bairro, local amigável',
        briefInformation: 'Varios sabores',
        price: 30,
        urlImage: 'https://baconmockup.com/640/360'
      },
      {
        id: 2,
        name: 'Burger Street',
        about: 'Melhor burguer do bairro, local amigável',
        briefInformation: 'Artesanal',
        price: 30,
        urlImage: 'https://baconmockup.com/640/360'
      },
      {
        id: 3,
        name: 'Nossa Rosquinha',
        about: 'Melhor rosquinha do bairro, local amigável',
        briefInformation: 'Bem crocante',
        price: 30,
        urlImage: 'https://baconmockup.com/640/360'
      },
      {
        id: 4,
        name: 'Sorvete Gelado',
        about: 'Melhor sorvete do bairro, local amigável',
        briefInformation: 'Frutas e artificiais',
        price: 30,
        urlImage: 'https://baconmockup.com/640/360'
      }
    ];
  }
}
