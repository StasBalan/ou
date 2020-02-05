import { Injectable, Injector, InjectionToken } from '@angular/core';
import { Overlay, ComponentType, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';

import { DialogOverlayRef } from './dialog-overlay-ref.class';
import { IDialogConfig } from '@models/dialog.model';
import { defaultDialogConfig } from './dialog.config';

export const DIALOG_DATA = new InjectionToken<any>('DIALOG_DATA');

@Injectable()
export class DialogService {
  constructor(
    private readonly overlay: Overlay,
    private injector: Injector,
  ) {}

  public open(component: ComponentType<unknown>, dialogConfig: IDialogConfig = {}): DialogOverlayRef {
    const newDialogConfig = {...defaultDialogConfig, ...dialogConfig};

    const overlayRef = this.createOverlay(newDialogConfig);
    const dialogRef = new DialogOverlayRef(overlayRef);
    const injector = this.createInjector(dialogConfig, dialogRef);
    const dialogPortal = new ComponentPortal(component, null, injector);

    overlayRef.attach(dialogPortal);
    overlayRef.backdropClick().subscribe(_ => dialogRef.close());

    return dialogRef;
  }

  private createOverlay(dialogConfig: IDialogConfig): OverlayRef {
    const overlayConfig = this.getOverlayConfig(dialogConfig);

    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(dialogConfig: IDialogConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    return new OverlayConfig({
      ...dialogConfig,
      positionStrategy,
    });
  }

  private createInjector(dialogConfig: IDialogConfig, dialogRef: DialogOverlayRef): PortalInjector {
    const injectionTokens = new WeakMap();

    injectionTokens.set(DialogOverlayRef, dialogRef);
    injectionTokens.set(DIALOG_DATA, dialogConfig.data || {});

    return new PortalInjector(this.injector, injectionTokens);
  }
}
