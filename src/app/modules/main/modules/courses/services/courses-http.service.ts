import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthHttpService } from '@auth/auth-http.service';

import { ISuccessResponse } from '@models/common.models';
import { ICourse, ICourseCode, ICreateCourseData, IFullCourseData, IJoinedCourseData } from '../models/courses.model';
import { API } from '@constants';

@Injectable()
export class CoursesHttpService {
  constructor(
    private readonly authHttpService: AuthHttpService,
  ) {}

  public getCourses(): Observable<ICourse[]> {
    return this.authHttpService.authGet<ICourse[]>(API.getCourses);
  }

  public getCourse(courseId: number): Observable<IFullCourseData> {
    return this.authHttpService.authGet<IFullCourseData>(API.getFullCourseData(courseId));
  }

  public joinCourse(courseCode: ICourseCode): Observable<IJoinedCourseData> {
    return this.authHttpService.authPost<ICourseCode, IJoinedCourseData>(API.joinCourse, courseCode);
  }

  public createCourse(createCourseData: ICreateCourseData): Observable<ISuccessResponse> {
    return this.authHttpService.authPost<ICreateCourseData, ISuccessResponse>(API.createCourse, createCourseData);
  }
}
