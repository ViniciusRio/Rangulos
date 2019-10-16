import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from '../events/events.service';
import { Event } from '../events/event.model';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  loadEvents: Event[];
  private eventsSub: Subscription;

  constructor(
    private eventsService: EventsService,
    ) { }

  ngOnInit() {
    this.eventsSub = this.eventsService.events.subscribe(events => {
      this.loadEvents = events;
    });
  }

  ngOnDestroy() {
    if (this.eventsSub) {
      this.eventsSub.unsubscribe();
    }
  }
}
