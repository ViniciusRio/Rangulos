import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  {
    path: 'events/:id',
    loadChildren: './events/event-detail/event-detail.module#EventDetailPageModule',
    canLoad: [AuthGuard]

  },
  {
    path: 'new',
    loadChildren: './events/new-event/new-event.module#NewEventPageModule',
    canLoad: [AuthGuard]

  },
  {
    path: 'edit/:id',
    loadChildren: './events/my-events/edit-my-events/edit-my-events.module#EditMyEventsPageModule',
    canLoad: [AuthGuard]

  },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
