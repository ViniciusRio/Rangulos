import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile;
  isLoading = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
    ) {}

  ngOnInit() {
      this.loadUser();
  }

  ionViewDidEnter() {
    this.loadUser();
    console.log('did enter');
  }

  loadUser() {
    this.isLoading = true;
    this.authService.user().then((result: any) => {
      this.profile = {
        name: result.name,
        email: result.email,
        urlPhoto: 'https://picsum.photos/200/300'
      };
      this.isLoading = false;

    });
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
            this.loadingCtrl.create({
              message: 'Saindo...'
            }).then(loadingElement => {
              loadingElement.present();
              this.authService.logout().then(() => {
                loadingElement.dismiss();
                localStorage.removeItem('token');
                localStorage.clear();
                this.router.navigate(['/auth'], { replaceUrl: true });
              });
            });
          }
        }
      ]
    }).then(alertElement => {
      alertElement.present();
    });
  }
}
