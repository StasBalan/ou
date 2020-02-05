import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinnerModule } from '../spinner/spinner.module';

import { ImageComponent } from './component/image.component';

@NgModule({
  imports: [
    CommonModule,
    SpinnerModule,
  ],
  declarations: [
    ImageComponent,
  ],
  exports: [
    ImageComponent,
  ],
})
export class ImageModule {}
