import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Event } from '../event.model';
import { EventsService } from '../events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.page.html',
  styleUrls: ['./my-events.page.scss'],
})
export class MyEventsPage implements OnInit, OnDestroy {
  @Input() myEvents: Event;
  constructor(
    private eventsService: EventsService,
    private router: Router
  ) { }

  reMyEvents() {
    return this.myEvents;
  }
  ngOnInit() {
  }
  onDelete(eventId: string) {
    // this.eventsService.deleteEvent(eventId);
    this.router.navigate(['/', 'home']);

  }

  ngOnDestroy() {
    console.log('onDestroy my events');
  }
}
