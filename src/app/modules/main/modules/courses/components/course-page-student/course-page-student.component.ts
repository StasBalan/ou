import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CoursesHttpService } from '../../services/courses-http.service';

import { Spinner } from '@shared/spinner/spinner';
import { IFullCourseData } from '../../models/courses.model';

@Component({
  selector: 'ou-course-page-student',
  templateUrl: './course-page-student.component.html',
  styleUrls: ['./course-page-student.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursePageStudentComponent extends Spinner implements OnInit {
  public course: IFullCourseData;

  constructor(
    private readonly coursesHttpService: CoursesHttpService,
    private readonly route: ActivatedRoute,
    private readonly cdRef: ChangeDetectorRef,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.initCourseData();
  }

  private initCourseData(): void {
    this.showSpinner();

    const courseId: number = Number(this.route.snapshot.paramMap.get('courseId'));

    this.coursesHttpService.getCourse(courseId)
      .subscribe((courseData: IFullCourseData) => {
        this.course = courseData;

        this.hideSpinner();

        this.cdRef.markForCheck();
      });
  }
}
