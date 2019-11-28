import { Router } from '@angular/router';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AuthService } from './../auth/auth.service';
import { EventsService } from './../events/events.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
    ) { }

  ngOnInit() {
  }

  onCreateAccount(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const credentials = {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password
    };
    this.loadingCtrl.create({ message: 'Criando conta...' }).then(loadingElement => {
      loadingElement.present();
      this.authService.register(credentials).then(() => {
        loadingElement.dismiss();
        this.alertCtrl.create({
          header: 'Conta criada com sucesso',
          subHeader: 'Entre com sua nova conta.',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                loadingElement.dismiss();
                this.router.navigateByUrl('/auth');
              }
            }
          ]
        }).then(alertElement => {
          alertElement.present();
        });
      }, error => {
        this.toastCtrl.create({
          message: 'Não foi possível criar conta',
          duration: 2000
        }).then(toastElement => {
          loadingElement.dismiss();
          toastElement.present();
        });
      });
    });
  }
}
