import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EventsPage } from './events.page';
import { NewEventPage } from '../modals/event/new-event/new-event.page';
import { ReactiveFormsModule } from '@angular/forms';



const routes: Routes = [
  {
    path: '',
    component: EventsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EventsPage, NewEventPage],
  entryComponents: [NewEventPage]
})
export class EventsPageModule {}
