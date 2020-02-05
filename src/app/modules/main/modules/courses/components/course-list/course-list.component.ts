import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CoursesHttpService } from '../../services/courses-http.service';

import { Spinner } from '@shared/spinner/spinner';
import { chunk } from '@functions/chunk';
import { ICourse } from '../../models/courses.model';

const COURSES_CHUNK_SIZE = 10;

@Component({
  selector: 'ou-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListComponent extends Spinner implements OnInit {
  @Input()
  public valueToSearch = '';

  public filteredCourses: ICourse[] = [];
  public currentChunkIndex = 0;

  private courses$: BehaviorSubject<ICourse[]> = new BehaviorSubject<ICourse[]>([]);

  constructor(
    private readonly coursesHttpService: CoursesHttpService,
    private readonly cdRef: ChangeDetectorRef,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.showSpinner();
    this.loadCourses();
  }

  public get coursesChunksStream(): Observable<Array<ICourse[]>> {
    return this.courses$.asObservable()
      .pipe(
        map((courses: ICourse[]) => {
          this.filteredCourses = this.getFilteredCourses(courses);

          return chunk<ICourse>(this.filteredCourses, COURSES_CHUNK_SIZE);
        }),
      );
  }

  public get noCourses(): boolean {
    return this.courses$.getValue().length === 0;
  }

  public get oneCoursesChunk(): boolean {
    return !this.noCourses && this.filteredCourses.length <= COURSES_CHUNK_SIZE;
  }

  public get manyCourseChunks(): boolean {
    return this.filteredCourses.length > COURSES_CHUNK_SIZE;
  }

  public get noSearchResults(): boolean {
    return this.valueToSearch.length > 0 && this.filteredCourses.length === 0;
  }

  public showPage(pageIndex: number): void {
    this.currentChunkIndex = pageIndex;
  }

  public trackByCourses(_, course: ICourse): number {
    return course.courseId;
  }

  public trackByPages(index: number): number {
    return index;
  }

  private getFilteredCourses(courses: ICourse[]): ICourse[] {
    if (this.noCourses || this.valueToSearch.length === 0) {
      return courses;
    }

    return courses.filter((course: ICourse) => {
      const pureCourseName: string = course.courseName.trim().toLowerCase();
      const pureValueToSearch: string = this.valueToSearch.trim().toLowerCase();

      return pureCourseName.includes(pureValueToSearch);
    });
  }

  private loadCourses(): void {
    this.coursesHttpService.getCourses()
      .subscribe((courses: ICourse[]) => {
        this.courses$.next(courses);

        this.hideSpinner();

        this.cdRef.markForCheck();
      });
  }
}
