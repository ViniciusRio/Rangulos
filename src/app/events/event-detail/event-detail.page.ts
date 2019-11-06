import { Component, OnInit, OnDestroy } from '@angular/core';
import { Event } from '../event.model';
import { EventsService } from '../events.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { Subscription, of } from 'rxjs';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit, OnDestroy {
  loadedEvent: any;
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
      if (!paramMap.has('id')) {
        this.navCtrl.navigateBack('/home');
        return;
      }

      this.eventService
        .getEvent(paramMap.get('id'))
        .then(event => {
          this.loadedEvent = event;
        });
    });
  }

  onDeleteCurrent(id: string) {
    this.alertCtrl.create({
      header: 'Tem certeza disso?',
      subHeader: 'A ação não poderá ser disfeita',
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

  // onDelete(eventId: string) {
  //   this.alertCtrl.create({
  //     header: 'Tem certeza disso?',
  //     subHeader: 'Realmente deseja excluir o evento?',
  //     buttons: [
  //       {
  //         text: 'Cancelar',
  //         role: 'cancel',
  //         handler: () => {
  //           this.loadingCtrl.create({
  //             message: 'Removendo...'
  //           }).then(loadingElement => {
  //             loadingElement.present();
  //           });
  //         }
  //       },
  //       {
  //         text: 'Excluir',
  //         cssClass: 'deleteColor',
  //         handler: () => {
  //           this.loadingCtrl.create({
  //             message: 'Deletando...'
  //           }).then(loadingElement => {
  //             loadingElement.present();
  //             // this.eventService.deleteEvent(eventId).subscribe(() => {
  //             //   loadingElement.dismiss();
  //             // });
              
  //             console.log('excluir');
  //           });
  //         }
  //       }
  //     ]
  //   }).then(alertElement => {
  //     alertElement.present();
  //   });
  // }

  ngOnDestroy() {
    if (this.eventSub) {
      this.eventSub.unsubscribe();
    }
  }

}
