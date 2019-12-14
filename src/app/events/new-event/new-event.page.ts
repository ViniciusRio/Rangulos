import { Router } from '@angular/router';
import { Event } from '../../events/event.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController, AlertController, ModalController, NavController } from '@ionic/angular';
import { EventsService } from '../../events/events.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.page.html',
  styleUrls: ['./new-event.page.scss'],
})
export class NewEventPage implements OnInit {
  form: FormGroup;
  
  constructor(
    private loadingCtrl: LoadingController,
    private eventsService: EventsService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      about: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.maxLength(100)]
      }),
      address: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      price: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      maxGuests: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      startDate: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      endDate: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  onCreateEvent() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl
      .create({
        message: 'Criando evento...'
      })
      .then(loadingEl => {
        loadingEl.present();
        const newEvent = new Event(
          null,
          this.form.value.title,
          this.form.value.about,
          this.form.value.address,
          this.form.value.price,
          this.form.value.maxGuests,
          this.form.value.startDate,
          this.form.value.endDate,
          null,
          null
        );
        this.eventsService
          .addEvent(newEvent)
          .then((result: any) => {
            loadingEl.dismiss();
            this.form.reset();
            this.router.navigate(['/events/' + result.id ], { replaceUrl: true });
          }, () => {
            loadingEl.dismiss();
            this.alertCtrl.create({
              header: 'Ops, algo inesperado ocorreu...',
              subHeader: 'Não foi possível salvar evento.',
              buttons: [
                {
                  text: 'OK',
                  handler: () => {
                    this.router.navigate(['/events']);
                  }
                }
              ]
            }).then(alertElementError => {
              alertElementError.present();
            });
          });
      });
  }

  onModalDismiss() {
    this.modalCtrl.dismiss({ success: false });
  }

  onFillEvents() {
    this.alertCtrl.create({
      header: 'Criar três eventos?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.eventsService.fillEvents().then(() => {
              this.router.navigate(['/events']);
            });
          }
        }
      ]
    }).then(alertElement => {
      alertElement.present();
    });
  }

}
