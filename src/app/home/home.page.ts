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
  query = '';

  constructor(
    private eventsService: EventsService,
  ) { }

  ngOnInit() { }

  handlerRefresher(refresher) {
    if (refresher) {
      refresher.target.complete();
    }
  }

  ionViewWillEnter() {
    this.availableEvents();
  }

  availableEvents(refresher = null) {
    this.isLoading = !refresher;
    this.eventsService.fetchEvent(this.query).then(result => {
      this.loadEvents = result;
      this.isLoading = false;
      this.handlerRefresher(refresher);
    }, error => {
      this.handlerRefresher(refresher);
      this.loadEvents = [];
      this.isLoading = false;
    });
  }

  filterEvents(event) {
    this.query = event.detail.value;
    console.log(this.query);
    this.availableEvents(null);
  }

  getImage(id) {
    return this.eventsService.getImage(id);
  }

  ngOnDestroy() {
    if (this.eventsSub) {
      this.eventsSub.unsubscribe();
    }
  }
}
