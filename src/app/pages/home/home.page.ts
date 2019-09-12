import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events/events.service';
import { Event } from '../events/event.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  events: Event[];
  constructor(private eventsService: EventsService) {
  }

  ngOnInit() {
    this.events = this.eventsService.getAllEvents();
  }
}
