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
  profile = {
    name: 'Vinicius Rio',
    email: 'viniciustrave@gmail.com',
    urlPhoto: 'https://picsum.photos/200/300'
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController
    ) {}

  ngOnInit() {
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
            this.router.navigateByUrl('/auth');
          }
        }
      ]
    }).then(alertElement => {
      alertElement.present();
    });
  }
}
