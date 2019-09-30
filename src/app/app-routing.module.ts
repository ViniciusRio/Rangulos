import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  {
    path: 'home',
    children: [
      {
        path: '',
        loadChildren: './home/home.module#HomePageModule'
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
        loadChildren: './events/events.module#EventsPageModule'
      },
      {
        path: ':eventId',
        loadChildren: './events/event-detail/event-detail.module#EventDetailPageModule'
      },
    ]
  },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
