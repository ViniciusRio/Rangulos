import { EditEventComponent } from './../../modals/event/edit-event/edit-event.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EventDetailPage } from './event-detail.page';
import { NavigateBackDirective } from './navigate-back.directive';

const routes: Routes = [
  {
    path: '',
    component: EventDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EventDetailPage, EditEventComponent, NavigateBackDirective],
  entryComponents: [EditEventComponent]
})
export class EventDetailPageModule {}
