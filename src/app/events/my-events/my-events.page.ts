import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Event } from '../event.model';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.page.html',
  styleUrls: ['./my-events.page.scss'],
})
export class MyEventsPage implements OnInit, OnDestroy {
  @Input() myEvents: Event;
  constructor(
  ) { }

  ngOnInit() {
  }
  ngOnDestroy() {
    console.log('onDestroy my events');
  }
}
