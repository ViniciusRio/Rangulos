import { EditEventComponent } from './../../modals/event/edit-event/edit-event.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { EventsService } from '../events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController, AlertController, ModalController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {
  @ViewChild('file', { static: false }) file;
  loadedEvent: any;
  startHour: any;
  endHour: any;
  uploadForm: FormGroup;
  isLoading = false;
  isLoadingImage = false;

  constructor(
    private eventService: EventsService,
    private activedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private router: Router
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.activedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')) {
        this.navCtrl.navigateBack('/home');
        return;
      }
      this.getEvent(paramMap.get('id'));
    });

    this.formGroup();
  }
  editEvent() {
    this.modalCtrl.create({
      component: EditEventComponent,
      componentProps: { id: this.loadedEvent.id }
    }).then(modalElement => {
      modalElement.onDidDismiss().then((result: any) => {
        if (result.data && result.data.success) {
          this.loadedEvent.title = result.data.event.title;
          this.loadedEvent.about = result.data.event.about;
          this.loadedEvent.address = result.data.event.address;
          this.loadedEvent.price = result.data.event.price;
          this.loadedEvent.max_guests = result.data.event.max_guests;
          this.loadedEvent.start_envent = result.data.event.start_event;
          this.loadedEvent.end_envent = result.data.event.end_envent;
        }
      });
      modalElement.present();
    });
  }

  getEvent(id) {
    this.isLoading = true;
    this.eventService.getEvent(id).then((event: any) => {
      this.loadedEvent = event;
      console.log('get event', this.loadedEvent);
      if (this.loadedEvent.url_image) {
        this.getImage();
      }
      this.startHour = moment(this.loadedEvent.start_date).format('HH:mm');
      this.endHour = moment(this.loadedEvent.end_date).format('HH:mm');
      this.isLoading = false;
    });
  }

  onUpload() {
    this.file.nativeElement.click();
  }

  formGroup() {
    this.uploadForm = this.formBuilder.group({
      file: ['']
    });
  }

  onFileAdded(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('file').setValue(file);
      const formData = new FormData();
      formData.append('file', this.uploadForm.get('file').value);
      this.isLoadingImage = true;
      this.eventService.uploadImage(this.loadedEvent.id, formData).then(() => {
        this.getImage();
        this.isLoadingImage = false;
      }, (error) => {
        // TODO TOAST
      });
    }
  }

  onEnsureInvitation() {
    this.loadingCtrl.create({
      message: 'Garantindo Evento...'
    }).then(loadingElement => {
      this.alertCtrl.create({
        header: 'Garantir Convite?',
        subHeader: 'Será mostrado em Eventos Atuais.',
        buttons: [{
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Confirmar',
          handler: () => {
            this.eventService.ensureInvitation(this.loadedEvent.id).then(() => {
              loadingElement.present();
              this.getEvent(this.loadedEvent.id);
              loadingElement.dismiss();
            }, () => {
              this.alertCtrl.create({
                header: 'Não foi possível adquirir convite',
                subHeader: 'Tente novamente',
                buttons: [
                  {
                    text: 'OK',
                    handler: () => {
                      loadingElement.dismiss();
                      this.navCtrl.navigateForward('/home/events');
                    }
                  }
                ]
              }).then(alertElementError => {
                alertElementError.present();
              });
            });
          }
        }
        ]
      }).then(alertElement => {
        alertElement.present();
      });
    });
  }

  getImage() {
    this.loadedEvent.url_image = this.eventService.getImage(this.loadedEvent.id);
  }

  onPayEvent() {
    this.alertCtrl.create({
      header: 'Pagando evento',
      subHeader: 'Realmente pagar? Aparecerá em Eventos Atuais',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Sim',
          handler: () => {
            this.loadingCtrl.create({
              message: 'Pagando..'
            }).then(loadingElement => {
              loadingElement.present();
              this.eventService.payEvent(this.loadedEvent.id).then(() => {
                loadingElement.dismiss();
                this.router.navigate(['/events']);
              }, () => {
                loadingElement.dismiss();
              });
            });
          }
        }
      ]
    }).then(alertElement => {
      alertElement.present();
    });
  }

  openAddress() {
    const url = 'https://maps.google.com?q=' + this.loadedEvent.address;
    window.open(url, '_system');
  }

  onRate(event) {
    const rate = event.detail.value;
    this.eventService.rate(this.loadedEvent.id, rate);
    // TODO: ser possível atribuir nota ao evento
    // e exibir quantos vão para o evento
  }

  onForceDelete() {
    this.alertCtrl.create({
      header: 'Tem certeza disso?',
      subHeader: 'Realmente deseja excluir o evento?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          cssClass: 'alertDangerColor',
          handler: () => {
            this.loadingCtrl.create({
              message: 'Deletando...'
            }).then(loadingElement => {
              loadingElement.present();
              this.eventService.forceDelete(this.loadedEvent.id).then(() => {
                this.router.navigate(['/events']);
                loadingElement.dismiss();
              }, () => {
                loadingElement.dismiss();
                this.alertCtrl.create({
                  header: 'Algo de inesperado ocorreu',
                  subHeader: 'Não foi possível excluir',
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
        }
      ]
    }).then(alertElement => {
      alertElement.present();
    });
  }

  onSuspended(eventId: string) {
    this.alertCtrl.create({
      header: 'Tem certeza disso?',
      subHeader: 'Realmente deseja excluir o evento?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          cssClass: 'alertDangerColor',
          handler: () => {
            this.loadingCtrl.create({
              message: 'Deletando...'
            }).then(loadingElement => {
              loadingElement.present();
              this.eventService.suspendedEvent(eventId).then(() => {
                loadingElement.dismiss();
              }, () => {
                loadingElement.dismiss();
                this.alertCtrl.create({
                  header: 'Algo de inesperado ocorreu',
                  subHeader: 'Não foi possível excluir',
                  buttons: [
                    {
                      text: 'OK',
                      handler: () => {
                        this.navCtrl.pop();
                      }
                    }
                  ]
                }).then(alertElementError => {
                  alertElementError.present();
                });
              });
            });
          }
        }
      ]
    }).then(alertElement => {
      alertElement.present();
    });
  }

  onDeleteCurrent() {
    this.alertCtrl.create({
      header: 'Não ir mais ao evento?',
      subHeader: 'Deixará de ser convidado deste evento',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.loadingCtrl.create({
              message: 'Removendo...'
            }).then(loadingElement => {
              loadingElement.present();
              this.eventService.deleteGuest(this.loadedEvent.id).then(() => {
                loadingElement.dismiss();
                this.navCtrl.navigateForward('/events');
              });
            });
          }
        }
      ]
    }).then(alertElement => {
      alertElement.present();
    });
  }

  isEventEnded() {
    if (!this.loadedEvent) {
      return false;
    }
    let end_date = moment(this.loadedEvent.end_date);
    let now = moment();
    return end_date.diff(now, 'minutes') < 0;
  }
}
