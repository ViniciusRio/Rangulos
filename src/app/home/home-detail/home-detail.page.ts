import { Component, OnInit } from '@angular/core';
import { Event } from '../../events/event.model';
import { EventsService } from '../../events/events.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-detail',
  templateUrl: './home-detail.page.html',
  styleUrls: ['./home-detail.page.scss'],
})
export class HomeDetailPage implements OnInit {
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
