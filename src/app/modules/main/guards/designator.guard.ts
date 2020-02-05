import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { UserService } from '@services/user.service';

import { Roles } from '@models/user.models';

@Injectable()
export class DesignatorGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
  ) {}

  public canActivate(): boolean {
    const { roleId } = this.userService.getCurrentUser();

    const destination: string = roleId === Roles.Admin
      ? '/users-panel'
      : '/courses';

    this.router.navigate([destination]);

    return false;
  }
}
