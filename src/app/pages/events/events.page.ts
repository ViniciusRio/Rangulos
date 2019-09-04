import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  pastEvents: any;
  // eventos possiveis
  segments = {
    PAST_EVENTS: 'pastEvents',
    CURRENT_EVENT: 'currentEvent',
    MY_EVENTS: 'myEvents'
  };
  // evento padrão
  selectedSegment = this.segments.PAST_EVENTS;
  events = [];

  constructor() {
    this.events = [
    ];
   }

  ngOnInit() {
  }
  onSegmentChanged(event) {
    this.selectedSegment = event.detail.value;
  }
}
