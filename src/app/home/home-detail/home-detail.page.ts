import { Component, OnInit, OnDestroy } from '@angular/core';
import { Event } from '../../events/event.model';
import { EventsService } from '../../events/events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController, LoadingController } from '@ionic/angular';
import { GetInvitationComponent } from 'src/app/get-invitation/get-invitation.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-detail',
  templateUrl: './home-detail.page.html',
  styleUrls: ['./home-detail.page.scss'],
})
export class HomeDetailPage implements OnInit, OnDestroy {
  loadedEvent: Event;
  private eventSub: Subscription;

  constructor(
    private eventService: EventsService,
    private activedRoute: ActivatedRoute,
    private ctrlModal: ModalController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private router: Router
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

    });
  }
  onGetInvitation() {
    this.ctrlModal.create({
      component: GetInvitationComponent,
      componentProps: {eventInvitation: this.loadedEvent }
    })
    .then(modalElement => {
      modalElement.present();
      return modalElement.onDidDismiss();
    })
    .then(resultData => {
      console.log(resultData.data, resultData.role);
      if (resultData.role === 'confirmed') {
        this.loadingCtrl
          .create({ message: 'Garantindo convite(s)...' })
          .then(loadingElement => {
            loadingElement.present();
            const data = resultData.data.invitationData;
            this.eventService
              .addCurrentEvent(
                this.loadedEvent.name,
                this.loadedEvent.about,
                this.loadedEvent.adicionalInformation,
                this.loadedEvent.entertainment,
                this.loadedEvent.food,
                +this.loadedEvent.price,
                new Date(this.loadedEvent.startDate),
                new Date(this.loadedEvent.endDate),
              )
              .subscribe(() => {
                loadingElement.dismiss();
                this.router.navigate(['/events']);

              });
          });
      }
    });
  }

  ngOnDestroy() {
    if (this.eventSub) {
      this.eventSub.unsubscribe();
    }
  }
}
