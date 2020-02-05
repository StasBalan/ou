import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesignatorGuard } from './guards/designator.guard';

import { MainComponent } from './components/main/main.component';

const childRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [DesignatorGuard]
  },
  {
    path: 'courses',
    loadChildren: () => import(`./modules/courses/courses.module`).then(m => m.CoursesModule),
  },
  {
    path: 'chats',
    loadChildren: () => import(`./modules/chats/chats.module`).then(m => m.ChatsModule),
  },
  {
    path: 'settings',
    loadChildren: () => import(`./modules/settings/settings.module`).then(m => m.SettingsModule),
  },
  {
    path: 'users-panel',
    loadChildren: () => import('./modules/users-panel/users-panel.module').then(m => m.UsersPanelModule),
  }
];

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: childRoutes,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
