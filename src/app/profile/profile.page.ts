import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userLogin;
  profile;
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    ) {}

  ngOnInit() {
      this.loadUser();
  }

  ionViewDidEnter() {
    this.loadUser();
  }

  loadUser() {
    this.authService.user().then(result => {
      this.userLogin = result;
    });

    this.profile = {
      name: this.userLogin.name,
      email: this.userLogin.email,
      urlPhoto: 'https://picsum.photos/200/300'
    };
  }

  onLogout() {
    this.alertCtrl.create({
      header: 'Logout',
      subHeader: 'Deseja voltar para tela de login?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          cssClass: 'alertDangerColor',
          handler: () => {
            this.authService.logout();
            localStorage.removeItem('token');
            localStorage.clear();
            this.router.navigateByUrl('/auth');
          }
        }
      ]
    }).then(alertElement => {
      alertElement.present();
    });
  }
}
