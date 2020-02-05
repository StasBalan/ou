import { Component, ChangeDetectionStrategy, ElementRef, Input } from '@angular/core';

import { IUser, Roles } from '@models/user.models';

@Component({
  selector: 'ou-course-page-right-bar',
  templateUrl: './course-page-right-bar.component.html',
  styleUrls: ['./course-page-right-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursePageRightBarComponent {
  @Input()
  public courseUsers: IUser[];

  public isOpened = false;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
  ) {}

  public get students(): IUser[] {
    return this.getUsersByRole(Roles.Student);
  }

  public get teachers(): IUser[] {
    return this.getUsersByRole(Roles.Teacher);
  }

  public getUserFullName({ firstName, lastName }: IUser): string {
    return `${firstName} ${lastName}`;
  }

  public toggleCourseUsers(): void {
    this.isOpened = !this.isOpened;

    this.elementRef.nativeElement.style.maxWidth = this.isOpened ? '350px' : '40px';
  }

  private getUsersByRole(roleId: Roles): IUser[] {
    if (!this.courseUsers) {
      return [];
    }

    return this.courseUsers.filter((user: IUser) => user.roleId === roleId);
  }
}
