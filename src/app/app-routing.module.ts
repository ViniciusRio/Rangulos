import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },
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
        path: ':eventId',
        loadChildren: './events/event-detail/event-detail.module#EventDetailPageModule'
      },
    ]
  },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
