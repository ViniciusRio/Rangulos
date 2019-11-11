import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  onLogin() {
    this.isLoading = true;
    this.loadingCtrl.create({ keyboardClose: true, message: 'Autenticando...' })
      .then(loadingEl => {
        loadingEl.present();
        setTimeout(() => {
          this.isLoading = false;
          loadingEl.dismiss();
        });
      });

    console.log('IS LOGIN', this.isLogin);
  }

  onRegister() {
    this.loadingCtrl.create({ keyboardClose: true, message: 'Registrando...' })
      .then(loadingEl => {
        loadingEl.present();
        setTimeout(() => {
          loadingEl.dismiss();
          this.router.navigateByUrl('/auth');
          this.alertCtrl.create({
            header: 'Registro concluído com sucesso',
            subHeader: 'Pronto para efetuar seu primeiro login.',
            buttons: [
              {
                text: 'OK',
              }
            ]
          }).then(alertElement => {
            alertElement.present();
          });
        });
      });
  }

  onLogout() {
    this.authService.logout();
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const credentials = {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password
    };

    if (this.isLogin) {
      this.authService.login(credentials).then(result => {
        // console.log(result);
        this.router.navigateByUrl('/tabs/home');
        console.log(credentials);
      }, error => {
        this.alertCtrl.create({
          header: 'Login não efetuado',
          subHeader: 'Verifique o email/senha e tente novamente.',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.alertCtrl.dismiss();
              }
            }
          ]
        }).then(alertCtrlError => {
          alertCtrlError.present();
        });
      });
    } else {
      this.authService.register(credentials);
    }
  }
}
