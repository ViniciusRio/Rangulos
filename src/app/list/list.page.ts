import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  history = [];
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor() {
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }

    this.history = [
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
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
