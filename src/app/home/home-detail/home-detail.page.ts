import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from '../../events/events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import * as moment from 'moment';


@Component({
  selector: 'app-home-detail',
  templateUrl: './home-detail.page.html',
  styleUrls: ['./home-detail.page.scss'],
})
export class HomeDetailPage implements OnInit, OnDestroy {
  loadedEvent: any;
  startHour: any;
  endHour: any;
  private eventSub: Subscription;
  isLoading = false;

  constructor(
    private eventService: EventsService,
    private activedRoute: ActivatedRoute,
    private navCtrl: NavController,
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
          this.startHour = moment(this.loadedEvent.start_date).format('HH:mm');
          this.endHour = moment(this.loadedEvent.endHour).format('HH:mm');
        });
    });
  }
  onEnsureInvitation(eventId) {
    this.eventService.ensureInvitation(eventId).then(() => {
      this.navCtrl.navigateForward('/events');
    });
  }

  ngOnDestroy() {
    if (this.eventSub) {
      this.eventSub.unsubscribe();
    }
  }
}
