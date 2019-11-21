import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomePageModule',
            canLoad: [AuthGuard]
          },
        ]
      },
      {
        path: 'events',
        children: [
          {
            path: '',
            loadChildren: '../events/events.module#EventsPageModule',
            canLoad: [AuthGuard]
          },
          {
            path: 'new',
            loadChildren: '../events/new-event/new-event.module#NewEventPageModule',
            canLoad: [AuthGuard]

          },
          {
            path: ':id',
            loadChildren: '../events/event-detail/event-detail.module#EventDetailPageModule',
            canLoad: [AuthGuard]

          },
          {
            path: 'myEvent/:eventId',
            loadChildren: '../events/my-events/my-events.module#MyEventsPageModule',
            canLoad: [AuthGuard]

          },
          {
            path: 'edit-my-events/:id',
            loadChildren: '../events/my-events/edit-my-events/edit-my-events.module#EditMyEventsPageModule',
            canLoad: [AuthGuard]

          }
        ]
      },
      { path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule', canLoad: [AuthGuard]},
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
