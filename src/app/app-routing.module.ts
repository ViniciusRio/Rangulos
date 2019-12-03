import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: './home/home.module#HomePageModule' },
  {
    path: 'home',
    children: [
      {
        path: '',
        loadChildren: './home/home.module#HomePageModule',
        canLoad: [AuthGuard]
      },
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
    ]
  },
  {
    path: 'events/:id',
    loadChildren: './events/event-detail/event-detail.module#EventDetailPageModule',
    canLoad: [AuthGuard]

  },
  {
    path: 'new-event',
    loadChildren: './events/new-event/new-event.module#NewEventPageModule',
    canLoad: [AuthGuard]

  },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
