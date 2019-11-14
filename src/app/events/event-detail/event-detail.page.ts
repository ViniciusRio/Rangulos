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
          console.log('event detail: ', this.loadedEvent);
          this.startHour = moment(this.loadedEvent.start_date).format('HH:mm');
          this.endHour = moment(this.loadedEvent.endHour).format('HH:mm');
        });
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

  isEventEnded() {
    let end_date = moment(this.loadedEvent.end_date);
    let now = moment();

    return end_date.diff(now, 'minutes') < 0;
  }

  openAddress() {
    const url = 'https://maps.google.com?q=' + this.loadedEvent.address;
    window.open(url, '_system');
  }

  onRate() {
    // TODO: ser possível atribuir nota ao evento
    // e exibir quantos vão para o evento
  }

}
