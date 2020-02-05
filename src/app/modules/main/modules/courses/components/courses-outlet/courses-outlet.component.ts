import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { LocalStorageService } from '@services/local-storage.service';

import { Roles, IUser } from '@models/user.models';
import { LocalStorageKeys } from '@constants';

@Component({
  selector: 'ou-courses-outlet',
  templateUrl: './courses-outlet.component.html',
  styleUrls: ['./courses-outlet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesOutletComponent implements OnInit {
  public readonly roles = Roles;
  public currentRole: Roles;

  constructor(
    private readonly localStorageService: LocalStorageService,
  ) {}

  public ngOnInit(): void {
    this.initCurrentRole();
  }

  private initCurrentRole(): void {
    const { roleId } = this.localStorageService.getItem<IUser>(LocalStorageKeys.User);

    this.currentRole = roleId;
  }
}
