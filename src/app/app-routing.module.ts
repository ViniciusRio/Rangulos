import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    children: [
      {
        path: '',
        loadChildren: './home/home.module#HomePageModule',
        canLoad: [AuthGuard]
      },
      {
        path: ':eventId',
        loadChildren: './home/home-detail/home-detail.module#HomeDetailPageModule'
      }
    ]
  },
  {
    path: 'events',
    children: [
      {
        path: '',
        loadChildren: './events/events.module#EventsPageModule',
        canLoad: [AuthGuard]
      },
      {
        path: 'new',
        loadChildren: './events/new-event/new-event.module#NewEventPageModule'
      },
      {
        path: ':id',
        loadChildren: './events/event-detail/event-detail.module#EventDetailPageModule'
      },
      {
        path: 'myEvent/:eventId',
        loadChildren: './events/my-events/my-events.module#MyEventsPageModule'
      },
      {
        path: 'edit-my-events/:eventId',
        loadChildren: './events/my-events/edit-my-events/edit-my-events.module#EditMyEventsPageModule'
      }
    ]
  },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  { path: 'my-events', loadChildren: './events/my-events/my-events.module#MyEventsPageModule' },
  { path: 'edit-my-events', loadChildren: './events/my-events/edit-my-events/edit-my-events.module#EditMyEventsPageModule' },
  { path: 'new-event', loadChildren: './events/new-event/new-event.module#NewEventPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
