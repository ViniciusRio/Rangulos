import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, IonItemSliding, AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { EventsService } from './events.service';
import { Event } from './event.model';
import { MyEventsPage } from './my-events/my-events.page';
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

  selectedSegment = this.segments.CURRENT_EVENT;
  events: Event[];
  pastEvents;
  currentEvent;
  myEvents;
  isLoading = false;

  constructor(
    private router: Router,
    private eventsService: EventsService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.loadCurrentEvent();
    this.loadMyEvents();
    this.loadPastEvents();
  }

  loadCurrentEvent() {
    this.isLoading = true;
    this.eventsService.getCurrent().then(result => {
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

  onSegmentChanged(event) {
    this.selectedSegment = event.detail.value;
  }

  onEdit(id: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'events', 'edit-my-events', id]);
  }

  onDelete(eventId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
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
          cssClass: 'deleteColor',
          handler: () => {
            this.loadingCtrl.create({
              message: 'Deletando...'
            }).then(loadingElement => {
              loadingElement.present();
              this.eventsService.deleteEvent(eventId).then(() => {
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
