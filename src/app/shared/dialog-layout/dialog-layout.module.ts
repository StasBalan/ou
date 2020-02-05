import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';

import { DialogLayoutComponent } from './dialog-layout.component';

@NgModule({
  imports: [
    MatIconModule,
  ],
  declarations: [
    DialogLayoutComponent,
  ],
  exports: [
    DialogLayoutComponent,
  ],
})
export class DialogLayoutModule {}
