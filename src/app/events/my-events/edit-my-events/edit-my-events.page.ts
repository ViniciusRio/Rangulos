import { Component, OnInit, OnDestroy } from '@angular/core';
import { Event } from '../../event.model';
import { EventsService } from '../../events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {  Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-my-events',
  templateUrl: './edit-my-events.page.html',
  styleUrls: ['./edit-my-events.page.scss'],
})
export class EditMyEventsPage implements OnInit, OnDestroy {
  event: Event;
  form: FormGroup;
  private eventSub: Subscription;

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('eventId')) {
        this.navCtrl.navigateBack('/events');
        return;
      }
      const eventId = paramMap.get('eventId');
      this.eventSub = this.eventsService
      .getEvent(eventId)
      .subscribe(event => {
        this.event = event;
        this.form = new FormGroup({
          name: new FormControl(this.event.name, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          about: new FormControl(this.event.about, {
            updateOn: 'blur',
            validators: [Validators.required, Validators.maxLength(100)]
          }),
          adicionalInformation: new FormControl(this.event.adicionalInformation, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          entertainment: new FormControl(this.event.entertainment, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          food: new FormControl(this.event.food, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          price: new FormControl(this.event.price, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          numberGuests: new FormControl(this.event.numberGuests, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          startDate: new FormControl(this.event.startDate, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          endDate: new FormControl(this.event.endDate, {
            updateOn: 'blur',
            validators: [Validators.required]
          })
        });
      });
    });
  }

  onUpdateEvent() {
    if (this.form.invalid) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Atualizando evento...'
    }).then(loadingEvent => {
      loadingEvent.present();
      this.eventsService.updateEvent(
        this.event.id,
        this.form.value.name,
        this.form.value.about,
        this.form.value.adicionalInformation,
        this.form.value.entertainment,
        this.form.value.food,
        this.form.value.price,
        this.form.value.startDate,
        this.form.value.endDate
        ).subscribe(() => {
          this.loadingCtrl.dismiss();
          this.form.reset();
          this.router.navigate(['/events']);
          console.log('update event');
      });
    });
}

  ngOnDestroy() {
    if (this.eventSub) {
      this.eventSub.unsubscribe();
    }
  }
}
