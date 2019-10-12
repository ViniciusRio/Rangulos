import { Component, OnInit } from '@angular/core';
import { NavController, IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { EventsService } from './events.service';
import { Event } from './event.model';


@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  // eventos possiveis
  segments = {
    PAST_EVENTS: 'pastEvents',
    CURRENT_EVENT: 'currentEvent',
    MY_EVENTS: 'myEvents'
  };
  // evento padrão
  selectedSegment = this.segments.PAST_EVENTS;
  events: Event[];
  pastEvents;
  currentEvent;
  myEventsList;

  constructor(
    private router: Router,
    private eventsService: EventsService
    ) {}

  ngOnInit() {
    this.events = this.eventsService.getAllEvents();
    this.pastEvents = this.events.filter(event => {
      return event.verifiedPayment === true;
    });
    this.currentEvent = this.events.find(onlyEvent => onlyEvent.id === '2');
    this.myEventsList = this.events.filter(event => {
      return event.iCreated === true;
    });

  }
  onSegmentChanged(event) {
    this.selectedSegment = event.detail.value;
  }

  onEdit(eventId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'events', 'edit-my-events', eventId]);
    console.log('edit');
  }

}
