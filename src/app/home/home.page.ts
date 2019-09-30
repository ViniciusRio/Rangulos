import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from '../events/events.service';
import { Event } from '../events/event.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  loadEvents: Event[];
  constructor(
    private eventsService: EventsService,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.loadEvents = this.eventsService.getAllEvents();
    console.log('init ' + this.authService.userAuth);

  }
}
