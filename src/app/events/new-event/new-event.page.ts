import { Event } from './../event.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { EventsService } from '../events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.page.html',
  styleUrls: ['./new-event.page.scss'],
})
export class NewEventPage implements OnInit {
  form: FormGroup;
  constructor(
    private loadingCtrl: LoadingController,
    private eventsService: EventsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      about: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(100)]
      }),
      address: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      price: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      maxGuests: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      startDate: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      endDate: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }



  onCreateEvent() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl
      .create({
        message: 'Criando evento...'
      })
      .then(loadingEl => {
        loadingEl.present();
        const newEvent = new Event(
          null,
          this.form.value.title,
          this.form.value.about,
          this.form.value.address,
          this.form.value.price,
          this.form.value.maxGuests,
          new Date(this.form.value.startDate),
          new Date(this.form.value.endDate),
          'https://estrangeira.com.br/wp-content/uploads/2016/09/Captura-de-Tela-2016-09-12-a%CC%80s-18.36.47-602x500.png',
          null
        );
        this.eventsService
          .addEvent(newEvent)
          .then(() => {
            loadingEl.dismiss();
            this.form.reset();
            this.router.navigate(['/home']);
          }, () => {
            loadingEl.dismiss();
          });
      });
  }

}
