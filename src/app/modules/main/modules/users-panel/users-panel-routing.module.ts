import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersPanelComponent } from './components/users-panel/users-panel.component';

const routes: Routes = [
  { path: '', component: UsersPanelComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersPanelRoutingModule {}
