import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyEventsDetailPage } from './my-events-detail.page';

const routes: Routes = [
  {
    path: '',
    component: MyEventsDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyEventsDetailPage]
})
export class MyEventsDetailPageModule {}
