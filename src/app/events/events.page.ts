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
export class EventsPage implements OnInit, OnDestroy{
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
  myEventsList;
  isLoading = false;

  constructor(
    private router: Router,
    private eventsService: EventsService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
    ) {}

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.eventsService.getCurrent().then(result => {
      this.currentEvent = result;
    });
    // this.eventsService.fetchEvent().subscribe(() => {
      // this.isLoading = false;
    // });
  }

  onSegmentChanged(event) {
    this.selectedSegment = event.detail.value;
  }

  onEdit(eventId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'events', 'edit-my-events', eventId]);
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
              // this.eventsService.deleteEvent(eventId).subscribe(() => {
              //   loadingElement.dismiss();
              // });
              this.router.navigate(['events']);
              console.log('excluir');
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
