import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { ICourse } from '../../models/courses.model';

@Component({
  selector: 'ou-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseCardComponent {
  @Input()
  public course: ICourse;

  constructor(
    private readonly router: Router,
  ) {}

  public goToCoursePage(courseId: number): void {
    this.router.navigate(['courses', courseId], {
      state: {
        fromCourseList: true,
      },
    });
  }
}
