import { Component, OnInit } from '@angular/core';
import { Event } from '../event.model';
import { EventsService } from '../events.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {
  loadedEvent: Event;
  constructor(
    private eventService: EventsService,
    private activedRoute: ActivatedRoute
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

}
