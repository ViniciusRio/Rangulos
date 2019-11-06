import { Component, OnInit, OnDestroy } from '@angular/core';
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
  loadedEvent: any;
  private eventSub: Subscription;
  isLoading = false;

  constructor(
    private eventService: EventsService,
    private activedRoute: ActivatedRoute,
    private ctrlModal: ModalController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.activedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')) {
        this.navCtrl.navigateBack('/events');
        return;
      }
      this.isLoading = true;
      this.eventService
        .getEvent(paramMap.get('id'))
        .then(event => {
          this.loadedEvent = event;
          this.isLoading = false;
          console.log('home-detail: ', event);

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
            // this.eventService
              // .addCurrentEvent(
              //   this.loadedEvent.name,
              //   this.loadedEvent.about,
              //   this.loadedEvent.adicionalInformation,
              //   this.loadedEvent.entertainment,
              //   this.loadedEvent.food,
              //   +this.loadedEvent.price,
              //   new Date(this.loadedEvent.startDate),
              //   new Date(this.loadedEvent.endDate),
              // )
              // .subscribe(() => {
              //   loadingElement.dismiss();
              //   this.router.navigate(['/events']);

              // });
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
