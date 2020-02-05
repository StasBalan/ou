import { NgModule, ModuleWithProviders } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';

import { DialogLayoutModule } from '../dialog-layout/dialog-layout.module';

import { DialogService } from './dialog.service';

@NgModule({
  imports: [
    OverlayModule,
    DialogLayoutModule,
  ],
  exports: [
    OverlayModule,
    DialogLayoutModule,
  ],
})
export class DialogModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: DialogModule,
      providers: [
        DialogService,
      ],
    };
  }
}
