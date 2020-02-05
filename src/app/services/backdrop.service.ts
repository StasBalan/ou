import { Injectable } from '@angular/core';

@Injectable()
export class BackdropService {
  public isVisiable = false;

  public showBackdrop(): void {
    this.isVisiable = true;
  }

  public hideBackdrop(): void {
    this.isVisiable = false;
  }
}
