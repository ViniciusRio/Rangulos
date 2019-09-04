import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  eventOne;
  eventTwo;
  eventThree;
  eventFour;


  constructor(
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((paramAsMap: any) => {
      const params = paramAsMap.params;
      console.log(params);
    });

    this.eventOne = {
        id: 1,
        name: 'Pizza em casa, mas fora',
        about: 'Melhor pizza do bairro, local amigável',
        briefInformation: 'Varios sabores',
        price: 30,
        urlImage: 'https://baconmockup.com/640/360'
      };
    this.eventTwo = {
        id: 2,
        name: 'Burger Street',
        about: 'Melhor burguer do bairro, local amigável',
        briefInformation: 'Artesanal',
        price: 30,
        urlImage: 'https://baconmockup.com/640/360'
      };
    this.eventThree = {
        id: 3,
        name: 'Nossa Rosquinha',
        about: 'Melhor rosquinha do bairro, local amigável',
        briefInformation: 'Bem crocante',
        price: 30,
        urlImage: 'https://baconmockup.com/640/360'
      };
    this.eventFour = {
        id: 4,
        name: 'Sorvete Gelado',
        about: 'Melhor sorvete do bairro, local amigável',
        briefInformation: 'Frutas e artificiais',
        price: 30,
        urlImage: 'https://baconmockup.com/640/360'
      };
  }

  ngOnInit() {
  }

}
