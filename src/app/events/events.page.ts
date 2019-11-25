import { NewEventPage } from './../modals/event/new-event/new-event.page';
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
    this.loadCurrentEvent();
    this.loadMyEvents();
    this.loadPastEvents();
    console.log('will enter');
  }

  ionViewWillLeave() {
    console.log('will leave');
  }

  ionViewDidLeave() {
    console.log('did leave');
  }

  loadCurrentEvent() {
    this.isLoading = true;
    this.eventsService.getCurrentEvents().then(result => {
      console.log('currents', result);
      this.currentEvent = result;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    });
  }

  loadPastEvents() {
    this.isLoading = true;
    this.eventsService.getPastEvents().then(result => {
      this.pastEvents = result;
      console.log('past: ', this.pastEvents);
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    });
  }

  loadMyEvents() {
    this.isLoading = true;
    this.eventsService.getMyEvents().then(result => {
      this.myEvents = result;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    });
  }

  newEvent() {
    this.modalCtrl.create({
      component: NewEventPage,
    }).then(modalElement => {
      modalElement.present();
      return modalElement.onDidDismiss();
    }).then(() => {
      this.loadMyEvents();
    });
  }

  getImage(id) {
    return this.eventsService.getImage(id);
  }

  onSegmentChanged(event) {
    this.selectedSegment = event.detail.value;
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
