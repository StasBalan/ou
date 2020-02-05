import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';

export class DialogOverlayRef {
  public afterClosed$: Subject<any> = new Subject<any>();

  constructor(
    private readonly overlayRef: OverlayRef,
  ) {}

  public close(data?: any): void {
    this.overlayRef.dispose();

    this.afterClosed$.next(data || null);
  }
}
