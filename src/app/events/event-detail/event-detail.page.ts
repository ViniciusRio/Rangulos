import { Component, OnInit, OnDestroy } from '@angular/core';
import { Event } from '../event.model';
import { EventsService } from '../events.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit, OnDestroy {
  loadedEvent: Event;
  private eventSub: Subscription;

  constructor(
    private eventService: EventsService,
    private activedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
    ) { }

  ngOnInit() {
    this.activedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('eventId')) {
        this.navCtrl.navigateBack('/home');
        return;
      }
      this.eventSub = this.eventService
        .getEvent(paramMap.get('eventId'))
        .subscribe(event => {
          this.loadedEvent = event;
        });
      console.log(this.loadedEvent);
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
          cssClass: 'deleteColor',
          handler: () => {
            this.loadingCtrl.create({
              message: 'Deletando...'
            }).then(loadingElement => {
              loadingElement.present();
              this.eventService.deleteEvent(eventId).subscribe(() => {
                loadingElement.dismiss();
              });
              this.navCtrl.pop();
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
    if (this.eventSub) {
      this.eventSub.unsubscribe();
    }
  }

}
