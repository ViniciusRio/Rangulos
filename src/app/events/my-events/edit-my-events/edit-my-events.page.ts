import { Component, OnInit } from '@angular/core';
import { Event } from '../../event.model';
import { EventsService } from '../../events.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-my-events',
  templateUrl: './edit-my-events.page.html',
  styleUrls: ['./edit-my-events.page.scss'],
})
export class EditMyEventsPage implements OnInit {
  event: Event;
  form: FormGroup;
  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('eventId')) {
        this.navCtrl.navigateBack('/events');
        return;
      }
      this.event = this.eventsService.getEvent(paramMap.get('eventId'));
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
        date: new FormControl(this.event.date, {
          updateOn: 'blur',
          validators: [Validators.required]
        })
      });

    });
  }
  onUpdateEvent() {
    console.log(this.form);
  }

}
