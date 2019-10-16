import { Component, OnInit, OnDestroy } from '@angular/core';
import { Event } from '../event.model';
import { EventsService } from '../events.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
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

  ngOnDestroy() {
    if (this.eventSub) {
      this.eventSub.unsubscribe();
    }
  }

}
