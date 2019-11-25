import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from '../events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

class UpdateEvent {
  constructor(
    id: string,
    title: string,
    about: string,
    address: string,
    price: number,
    max_guests: number,
    start_date: Date,
    end_date: Date
  ) { }
}


@Component({
  selector: 'app-edit-my-events',
  templateUrl: './edit-my-events.page.html',
  styleUrls: ['./edit-my-events.page.scss'],
})
//add destroy e init
export class EditMyEventsPage {
 
}
