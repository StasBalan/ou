import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { NonAuthorizedGuard } from './guards/non-authorized.guard';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren:
      () => import('./modules/main/main.module').then(m => m.MainModule),
  },
  {
    path: 'login',
    canActivate: [NonAuthorizedGuard],
    component: LoginComponent,
  },
  {
    path: 'register',
    canActivate: [NonAuthorizedGuard],
    component: RegisterComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {}
