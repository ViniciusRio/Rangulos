import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, IonItemSliding, AlertController } from '@ionic/angular';
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
export class EventsPage implements OnInit, OnDestroy{
  // eventos possiveis
  segments = {
    PAST_EVENTS: 'pastEvents',
    CURRENT_EVENT: 'currentEvent',
    MY_EVENTS: 'myEvents'
  };
  // evento padrão
  private eventsSub: Subscription;

  selectedSegment = this.segments.PAST_EVENTS;
  events: Event[];
  pastEvents;
  currentEvent;
  myEventsList;

  constructor(
    private router: Router,
    private eventsService: EventsService,
    private alertCtrl: AlertController,
    ) {}

  ngOnInit() {
    this.eventsSub = this.eventsService.events.subscribe(events => {
      this.events = events;
      this.myEventsList = this.events.filter(event => {
        return event.iCreated === true;
      });
    });


    this.pastEvents = this.events.filter(event => {
      return event.verifiedPayment === true;
    });
    this.currentEvent = this.events.find(onlyEvent => onlyEvent.id === '3');
    this.myEventsList = this.events.filter(event => {
      return event.iCreated === true;
    });
    console.log('will enter events');
  }

  onSegmentChanged(event) {
    this.selectedSegment = event.detail.value;
  }

  onEdit(eventId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'events', 'edit-my-events', eventId]);
    console.log('edit');
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
            // this.eventsService.deleteEvent(eventId);
            // this.router.navigate(['events']);
            console.log('excluir');
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
