import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { IUser } from '@models/user.models';
import { ICourseItem } from '../../models/courses.model';

@Component({
  selector: 'ou-course-page-items-list',
  templateUrl: 'course-page-items-list.component.html',
  styleUrls: ['course-page-items-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursePageItemsListComponent {
  @Input()
  public courseItems: ICourseItem[];

  public get noCourseItems(): boolean {
    return this.courseItems.length === 0;
  }

  public getFullNameTeacher({ firstName, lastName }: IUser): string {
    return `${firstName} ${lastName}`;
  }
}
