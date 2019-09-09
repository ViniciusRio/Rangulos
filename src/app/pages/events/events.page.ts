import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MyEventsPage } from './myEvents/myEvents.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  // eventos possiveis
  segments = {
    PAST_EVENTS: 'pastEvents',
    CURRENT_EVENT: 'currentEvent',
    MY_EVENTS: 'myEvents'
  };
  // evento padrão
  selectedSegment = this.segments.PAST_EVENTS;
  pastEvents = [];
  currentEvent;
  myEvents;


  constructor(private router: Router) {
    this.pastEvents = [
      {
        id: 1,
        name: 'Pizza em casa, mas fora',
        about: 'Melhor pizza do bairro, local amigável',
        briefInformation: 'Varios sabores',
        price: 25,
        date: '19/02/2019',
        urlImage: 'https://baconmockup.com/640/360'
      },
      {
        id: 2,
        name: 'Burger Street',
        about: 'Melhor burguer do bairro, local amigável',
        briefInformation: 'Artesanal',
        price: 35,
        date: '22/03/2019',
        urlImage: 'https://baconmockup.com/640/360'
      },
      {
        id: 3,
        name: 'Nossa Rosquinha',
        about: 'Melhor rosquinha do bairro, local amigável',
        briefInformation: 'Bem crocante',
        price: 50,
        date: '29/06/2019',
        urlImage: 'https://baconmockup.com/640/360'
      },
      {
        id: 4,
        name: 'Sorvete Gelado',
        about: 'Melhor sorvete do bairro, local amigável',
        briefInformation: 'Frutas e artificiais',
        price: 20,
        date: '30/06/2019',
        urlImage: 'https://baconmockup.com/640/360'
      }
    ];
    this.currentEvent = {
        id: 1,
        name: 'Sorvete Gelado',
        about: 'Melhor sorvete do bairro, local amigável',
        briefInformation: 'Frutas e artificiais',
        price: 20,
        date: '30/06/2019',
        urlImage: 'https://baconmockup.com/640/360'
    };
    this.myEvents = {
      id: 1,
      name: 'Sorvete Gelado',
      about: 'Melhor sorvete do bairro, local amigável',
      briefInformation: 'Frutas e artificiais',
      price: 20,
      date: '30/06/2019',
      duration: 6,
      urlImage: 'https://baconmockup.com/640/360'
  };
   }

  ngOnInit() {
  }
  onSegmentChanged(event) {
    this.selectedSegment = event.detail.value;
  }

  navigateToOtherPage(): void {
    this.router.navigate(['myEvents']);
 }
}
