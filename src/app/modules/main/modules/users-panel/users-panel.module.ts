import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material';

import { CustomInputModule } from '@shared/custom-input/custom-input.module';
import { SpinnerModule } from '@shared/spinner/spinner.module';
import { DialogModule } from '@shared/dialog/dialog.module';
import { UsersPanelRoutingModule } from './users-panel-routing.module';

import { UsersPanelHttpsService } from './services/usres-panel-http.service';
import { FilesService } from '@services/files.service';

import { UsersPanelComponent } from './components/users-panel/users-panel.component';
import { UserPanelCardComponent } from './components/user-panel-card/user-panel-card.component';
import { UserEditDialogComponent } from './components/user-edit-dialog/user-edit-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    CustomInputModule,
    SpinnerModule,
    DialogModule.forRoot(),
    UsersPanelRoutingModule,
  ],
  declarations: [
    UsersPanelComponent,
    UserPanelCardComponent,
    UserEditDialogComponent,
  ],
  providers: [
    UsersPanelHttpsService,
    FilesService,
  ],
  entryComponents: [
    UserEditDialogComponent,
  ],
})
export class UsersPanelModule {}
