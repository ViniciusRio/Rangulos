import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from '../events.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {
  loadedEvent: any;
  startHour: any;
  endHour: any;

  constructor(
    private eventService: EventsService,
    private activedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
    ) { }

  ngOnInit() {
    this.activedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')) {
        this.navCtrl.navigateBack('/home');
        return;
      }

      this.eventService
        .getEvent(paramMap.get('id'))
        .then(event => {
          this.loadedEvent = event;
          this.startHour = moment(this.loadedEvent.start_date).format('HH:mm');
          this.endHour = moment(this.loadedEvent.endHour).format('HH:mm');
        });
    });
  }
  onDelete(eventId: string) {
    this.alertCtrl.create({
      header: 'Tem certeza disso?',
      subHeader: 'Realmente deseja excluir o evento?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('cancelar');
          }
        },
        {
          text: 'Excluir',
          cssClass: 'alertDangerColor',
          handler: () => {
            this.loadingCtrl.create({
              message: 'Deletando...'
            }).then(loadingElement => {
              loadingElement.present();
              this.eventService.deleteEvent(eventId).then(() => {
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

  onDeleteCurrent(id: string) {
    this.alertCtrl.create({
      header: 'Tem certeza disso?',
      subHeader: 'A ação não poderá ser desfeita',
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
              this.eventService.deleteGuest(id).then(() => {
                loadingElement.dismiss();
                this.navCtrl.pop();
              });
            });
          }
        }
      ]
    }).then(alertElement => {
      alertElement.present();
    });
  }

  onPayEvent() {
    this.alertCtrl.create({
      header: 'Pagando evento',
      subHeader: 'Realmente pagar?',
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
              console.log('lodedevent: ', this.loadedEvent);
              this.eventService.payEvent(this.loadedEvent.id).then(() => {
                loadingElement.dismiss();
                this.navCtrl.pop();
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

  onReactivate() {
    //TODO: ATIVAR EVENTO NOVAMENTE
  }
  isEventEnded() {
    if (!this.loadedEvent) {
      return false;
    }
    let end_date = moment(this.loadedEvent.end_date);
    let now = moment();
    
    return end_date.diff(now, 'minutes') < 0;
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

}
