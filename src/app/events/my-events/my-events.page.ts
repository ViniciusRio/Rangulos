import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../event.model';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.page.html',
  styleUrls: ['./my-events.page.scss'],
})
export class MyEventsPage implements OnInit {
  @Input() myEvents: Event;
  constructor(
  ) { }

  ngOnInit() {
  }

}
