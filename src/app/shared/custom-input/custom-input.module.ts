import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { CustomInputComponent } from '@shared/custom-input/custom-input.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CustomInputComponent,
  ],
  exports: [
    CustomInputComponent,
  ]
})
export class CustomInputModule {}
