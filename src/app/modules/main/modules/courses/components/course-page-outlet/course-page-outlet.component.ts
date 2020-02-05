import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { UserService } from '@services/user.service';

import { Roles, IUser } from '@models/user.models';

@Component({
  selector: 'ou-course-page-outlet',
  templateUrl: './course-page-outlet.component.html',
  styleUrls: ['./course-page-outlet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursePageOutletComponent implements OnInit {
  public readonly roles = Roles;
  public currentRole: Roles;

  constructor(
    private readonly userService: UserService,
  ) {}

  public ngOnInit(): void {
    this.initCurrentRole();
  }

  public initCurrentRole(): void {
    const { roleId } = this.userService.getCurrentUser();

    this.currentRole = roleId;
  }
}
