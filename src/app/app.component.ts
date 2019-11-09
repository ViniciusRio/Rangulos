import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

const { StatusBar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    private platform: Platform,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.setBackgroundColor({ color: '#7044ff' }).then(() => { }, () => { })
      .catch(() => { });
    });
  }
}
