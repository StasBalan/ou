import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { DialogOverlayRef } from '@shared/dialog/dialog-overlay-ref.class';

const noDialogRefProvidedError = `
 You must provide [dialogRef] as a parameter for <ou-dialog-layout>
 in order to use default close dialog implementation!
`;

@Component({
  selector: 'ou-dialog-layout',
  templateUrl: './dialog-layout.component.html',
  styleUrls: ['./dialog-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogLayoutComponent {
  @Input()
  public dialogRef: DialogOverlayRef;

  public closeDialog(): void {
    if (!this.dialogRef) {
      throw new Error(noDialogRefProvidedError);
    }

    this.dialogRef.close();
  }
}
