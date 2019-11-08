import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from '../events/events.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  loadEvents: any;
  private eventsSub: Subscription;
  isLoading = false;

  constructor(
    private eventsService: EventsService,
    ) { }

  ngOnInit() {
    }

  ionViewWillEnter() {
    this.isLoading = true;
    this.eventsService.fetchEvent().then(result => {
      this.loadEvents = result;
      this.isLoading = false;
    }, error => {
      this.loadEvents = [];
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    if (this.eventsSub) {
      this.eventsSub.unsubscribe();
    }
  }
}
