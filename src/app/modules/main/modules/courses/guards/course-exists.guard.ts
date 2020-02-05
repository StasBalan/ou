import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, NavigationExtras } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { CoursesHttpService } from '../services/courses-http.service';

import { ICourse } from '../models/courses.model';

@Injectable()
export class CourseExistsGuard implements CanActivate {
  constructor(
    private readonly coursesHttpService: CoursesHttpService,
    private readonly router: Router,
  ) {}

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const navigationExtras: NavigationExtras = this.router.getCurrentNavigation().extras;

    if (navigationExtras.state && navigationExtras.state.fromCourseList) {
      return of(true);
    }

    const courseId: number = Number(route.params.courseId);

    return this.coursesHttpService.getCourses()
      .pipe(
        map((courseList: ICourse[]) => {
          const tempCourse: ICourse = courseList.find((course: ICourse) => course.courseId === courseId);

          if (!tempCourse) {
            this.router.navigate(['/courses']);

            return false;
          }

          return true;
        })
      );
  }
}
