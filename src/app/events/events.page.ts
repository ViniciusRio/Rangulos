import { NewEventPage } from '../events/new-event/new-event.page';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonItemSliding, AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { EventsService } from './events.service';
import { Event } from './event.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit, OnDestroy {
  // eventos possiveis
  segments = {
    PAST_EVENTS: 'pastEvents',
    CURRENT_EVENT: 'currentEvent',
    MY_EVENTS: 'myEvents'
  };
  // evento padrão
  private eventsSub: Subscription;

  selectedSegment = this.segments.MY_EVENTS;
  events: Event[];
  pastEvents;
  currentEvent;
  myEvents;
  isLoading = false;

  constructor(
    private router: Router,
    private eventsService: EventsService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    console.log('will enter');
    this.loadPastEvents();
    this.doRefresh(null);
  }

  ionViewDidEnter() {
    console.log('did enter');
  }

  ionViewWillLeave() {
    console.log('will leave');
  }

  ionViewDidLeave() {
    console.log('Did leave');
  }

  loadCurrentEvent(refresher = null) {
    this.isLoading = refresher ? false : true;
    this.eventsService.getCurrentEvents().then(result => {
      console.log('currents', result);
      this.currentEvent = result;
      this.isLoading = false;
      this.handlerRefresher(refresher);
    }, error => {
      this.handlerRefresher(refresher);
      this.isLoading = false;
    });
  }

  loadPastEvents(refresher = null) {
    this.isLoading = refresher ? false : true;
    this.eventsService.getPastEvents().then(result => {
      console.log('pasts', result);
      this.pastEvents = result;
      this.isLoading = false;
      this.handlerRefresher(refresher);
    }, error => {
      this.handlerRefresher(refresher);
      this.isLoading = false;
    });
  }

  loadMyEvents(refresher = null) {
    this.isLoading = refresher ? false : true;
    this.eventsService.getMyEvents().then(result => {
      console.log('my', result);
      this.myEvents = result;
      this.isLoading = false;
      this.handlerRefresher(refresher);
    }, error => {
      this.isLoading = false;
      this.handlerRefresher(refresher);
    });
  }

  doRefresh(refresher) {
    switch (this.selectedSegment) {
      case this.segments.MY_EVENTS:
        this.loadMyEvents(refresher);
        break;
      case this.segments.PAST_EVENTS:
        this.loadPastEvents(refresher);
        break;
      case this.segments.CURRENT_EVENT:
        this.loadCurrentEvent(refresher);
        break;
    }
  }

  handlerRefresher(refresher) {
    if (refresher) {
      refresher.target.complete();
    }
  }
  newEvent() {
    this.modalCtrl.create({
      component: NewEventPage,
    }).then(modalElement => {
      modalElement.present();
      return modalElement.onDidDismiss();
    }).then((result: any) => {
      if (result.data.success) {
        this.loadMyEvents();
      }
    });
  }

  getImage(id) {
    return this.eventsService.getImage(id);
  }

  onSegmentChanged(event) {
    this.selectedSegment = event.detail.value;
    if (this.selectedSegment === this.segments.CURRENT_EVENT) {
      this.loadCurrentEvent();
    }

    if (this.selectedSegment === this.segments.MY_EVENTS) {
      this.loadMyEvents();
    }

    if (this.selectedSegment === this.segments.PAST_EVENTS) {
      this.loadPastEvents();
    }
  }

  onSuspended(eventId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.alertCtrl.create({
      header: 'Tem certeza disso?',
      subHeader: 'Realmente deseja suspender o evento?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('cancelar');
          }
        },
        {
          text: 'Confirmar',
          cssClass: 'alertDangerColor',
          handler: () => {
            this.loadingCtrl.create({
              message: 'Suspendendo evento...'
            }).then(loadingElement => {
              loadingElement.present();
              this.eventsService.suspendedEvent(eventId).then(() => {
                loadingElement.dismiss();
                this.loadMyEvents();
              }, () => {
                loadingElement.dismiss();
                this.alertCtrl.create({
                  header: 'Algo de inesperado ocorreu',
                  subHeader: 'Não foi possível excluir',
                  buttons: [
                    {
                      text: 'OK',
                      handler: () => {
                        this.router.navigateByUrl('/tabs/events');
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

  onRestore(id, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.alertCtrl.create({
      header: 'Reativar evento?',
      subHeader: 'Evento voltará a aparecer nas buscas',
      buttons: [
        {
          text: 'cancelar',
          role: 'cancel'
        },
        {
          text: 'Restaurar',
          handler: () => {
            this.loadingCtrl.create({
              message: 'Ativando evento...'
            }).then(loadingElement => {
              loadingElement.present();
              this.eventsService.restore(id).then(() => {
                loadingElement.dismiss();
                this.loadMyEvents();
              });
            });
          }
        }
      ]
    }).then(alertElement => {
      alertElement.present();
    });

  }

  ngOnDestroy() {
    if (this.eventsSub) {
      this.eventsSub.unsubscribe();
    }
  }

}
