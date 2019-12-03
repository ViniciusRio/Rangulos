import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';

import { Platform, AlertController, MenuController, Events } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { StatusBar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public profile =  {
      name: '',
      email: '',
      urlPhoto: 'https://picsum.photos/200/300'
    };

  public appPages = [
    {
      title: 'Inicío',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Meus eventos',
      url: '/events',
      icon: 'person',
      menuSegment: 'myEvents'
    },
    {
      title: 'Eventos atuais',
      url: '/events',
      icon: 'pizza',
      menuSegment: 'currentEvent'
    },
    {
      title: 'Eventos anteriores',
      url: '/events',
      icon: 'clock',
      menuSegment: 'pastEvents'
    }
  ];

  constructor(
    private platform: Platform,
    private authService: AuthService,
    private loadingCtrl: AlertController,
    private router: Router,
    private menu: MenuController,
    public event: Events
  ) {
    this.initializeApp();
    event.subscribe('login', () => {
      this.loadUser();
    });
  }

  loadUser() {
    this.authService.user().then((result: any) => {
      this.profile.name = result.name;
      this.profile.email = result.email;

    });
  }


  onLogout() {
    this.loadingCtrl.create({
      message: 'Saindo...'
    }).then(loadingElement => {
      loadingElement.present();
      this.authService.logout().then(() => {
        this.menu.close();
        loadingElement.dismiss();
        localStorage.removeItem('token');
        localStorage.clear();
        this.router.navigate(['/auth'], { replaceUrl: true });
      });
    });
  }

  initializeApp() {
    this.loadUser();
    this.platform.ready().then(() => {
      StatusBar.setBackgroundColor({ color: '#7044ff' }).then(() => { }, () => { })
      .catch(() => { });
    });
  }
}
