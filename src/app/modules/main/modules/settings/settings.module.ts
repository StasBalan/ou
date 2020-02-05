import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';

import { SettingsRoutingModule } from './settings-routing.module';

import { SettingsHttpService } from './services/settings-http.service';
import { FilesService } from '@services/files.service';

import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    SettingsRoutingModule,
  ],
  declarations: [
    SettingsComponent,
  ],
  providers: [
    SettingsHttpService,
    FilesService,
  ],
})
export class SettingsModule {}
