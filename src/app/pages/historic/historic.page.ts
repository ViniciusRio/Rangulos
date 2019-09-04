import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.page.html',
  styleUrls: ['./historic.page.scss'],
})
export class HistoricPage implements OnInit {
  historic = [];
  constructor() {
    this.historic = [
      {
        id: 1,
        name: 'Pizza em casa, mas fora',
        price: 30,
        urlImage: 'https://baconmockup.com/640/360'
      },
      {
        id: 2,
        name: 'Burger Street',
        price: 30,
        urlImage: 'https://baconmockup.com/640/360'
      },
      {
        id: 3,
        name: 'Nossa Rosquinha',
        price: 30,
        urlImage: 'https://baconmockup.com/640/360'
      },
      {
        id: 4,
        name: 'Sorvete Gelado',
        price: 30,
        urlImage: 'https://baconmockup.com/640/360'
      }
    ];
   }

  ngOnInit() {
  }

}
