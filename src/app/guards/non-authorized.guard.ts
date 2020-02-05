import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from '@auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NonAuthorizedGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

  public canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['']);

      return false;
    }

    return true;
  }
}
