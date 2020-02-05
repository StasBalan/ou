import { Component, ChangeDetectionStrategy } from '@angular/core';

import { MenuService } from '../../services/menu.service';

import { ILinkItem } from '../../models/link-items.models';

@Component({
  selector: 'ou-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [
    MenuService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  public menuItems: ILinkItem[] = this.menuService.getMenuItems();

  constructor(
    private readonly menuService: MenuService,
  ) {}
}
