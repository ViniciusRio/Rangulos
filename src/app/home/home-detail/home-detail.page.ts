import { Component, OnInit, OnDestroy } from '@angular/core';
import { Event } from '../../events/event.model';
import { EventsService } from '../../events/events.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
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
    private navCtrl: NavController

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
      componentProps: {eventInvitation: this.loadedEvent}
    })
    .then(modalElement => {
      modalElement.present();
      return modalElement.onDidDismiss();
    })
    .then(resultDate => {
      console.log(resultDate.data, resultDate.role)
    });
  }
  ngOnDestroy() {
    if (this.eventSub) {
      this.eventSub.unsubscribe();
    }
  }
}
