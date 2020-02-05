import { Injectable } from '@angular/core';

import { UserService } from '@services/user.service';

import { teachersAndStudentsMenuItems, adminMenuItems } from '../config/menu.config';
import { Roles } from '@models/user.models';
import { ILinkItem } from '../models/link-items.models';

@Injectable()
export class MenuService {
  constructor(
    private readonly userService: UserService,
  ) {}

  public getMenuItems(): ILinkItem[] {
    const { roleId } = this.userService.getCurrentUser();

    if (roleId === Roles.Admin) {
      return adminMenuItems;
    }

    return teachersAndStudentsMenuItems;
  }
}
