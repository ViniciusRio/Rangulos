import { Component, OnInit } from '@angular/core';
import { Event } from '../../events/event.model';
import { EventsService } from '../../events/events.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { GetInvitationComponent } from 'src/app/get-invitation/get-invitation.component';

@Component({
  selector: 'app-home-detail',
  templateUrl: './home-detail.page.html',
  styleUrls: ['./home-detail.page.scss'],
})
export class HomeDetailPage implements OnInit {
  loadedEvent: Event;
  constructor(
    private eventService: EventsService,
    private activedRoute: ActivatedRoute,
    private ctrlModal: ModalController
  ) { }

  ngOnInit() {
    this.activedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('eventId')) {
        return;
      }
      const eventId = paramMap.get('eventId');
      this.loadedEvent = this.eventService.getEvent(eventId);
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
}
