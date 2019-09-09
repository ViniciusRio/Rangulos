import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'event/:id',
    loadChildren: () => import('./pages/event/event.module').then(m => m.EventPageModule)
  },
  {
    path: 'myEvents',
    loadChildren: () => import('./pages/events/myEvents/myEvents.module').then(m => m.MyEventsPageModule)
  },
  // {
  //   path: 'events/:id',
  //   loadChildren: () => import('./pages/events/events.module').then(m => m.EventsPageModule)
  // },
  { path: 'events', loadChildren: './pages/events/events.module#EventsPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
