import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomeDetailPage } from './home-detail.page';
import { GetInvitationComponent } from 'src/app/get-invitation/get-invitation.component';

const routes: Routes = [
  {
    path: '',
    component: HomeDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomeDetailPage, GetInvitationComponent],
  entryComponents: [GetInvitationComponent]
})
export class HomeDetailPageModule {}
