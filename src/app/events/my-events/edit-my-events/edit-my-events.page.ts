import { Component, OnInit, OnDestroy } from '@angular/core';
import { Event } from '../../event.model';
import { EventsService } from '../../events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {  Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-my-events',
  templateUrl: './edit-my-events.page.html',
  styleUrls: ['./edit-my-events.page.scss'],
})
//add destroy e init
export class EditMyEventsPage  {
  event: any;
  form: FormGroup;
  isLoading = false;
  private eventSub: Subscription;

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')) {
        this.navCtrl.navigateBack('/events');
        return;
      }
      const eventId = paramMap.get('id');
      this.isLoading = true;
      this.eventsService
      .getEvent(eventId)
      .then(event => {
        this.event = event;
        this.form = new FormGroup({
          title: new FormControl(this.event.title, {
            updateOn: 'change',
            validators: [Validators.required]
          }),
          about: new FormControl(this.event.about, {
            updateOn: 'change',
            validators: [Validators.required, Validators.maxLength(100)]
          }),
          address: new FormControl(this.event.address, {
            updateOn: 'change',
            validators: [Validators.required]
          }),
          price: new FormControl(this.event.price, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          max_guests: new FormControl(this.event.max_guests, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          start_date: new FormControl(this.event.start_date, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          end_date: new FormControl(this.event.end_date, {
            updateOn: 'blur',
            validators: [Validators.required]
          })
        });
        this.isLoading = false;
      }, error => {
        this.alertCtrl.create({
          header: 'Algo não está certo',
          message: 'Evento não pode ser editado. Tente novamente.',
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                this.router.navigate(['/events']);
              }
            }
          ]
        }).then(alertElement => {
          alertElement.present();
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
        this.form.value.title,
        this.form.value.about,
        this.form.value.address,
        this.form.value.price,
        this.form.value.max_guests,
        this.form.value.start_date,
        this.form.value.end_date
        ).then(() => {
          this.loadingCtrl.dismiss();
          this.form.reset();
          this.router.navigate(['/events']);
          console.log('update event');
      });
    });
  }
}
