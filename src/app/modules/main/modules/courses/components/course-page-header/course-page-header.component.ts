import { Component, ChangeDetectionStrategy, Input, ViewChild, ElementRef } from '@angular/core';

import { IFullCourseData } from '../../models/courses.model';

@Component({
  selector: 'ou-course-page-header',
  templateUrl: './course-page-header.component.html',
  styleUrls: ['./course-page-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursePageHeaderComponent {
  @Input()
  public course: IFullCourseData;

  @ViewChild('descriptionRef', {static: false})
  public descriptionRef: ElementRef<HTMLDivElement>;

  public isOpened = false;

  public get maxHeight(): number {
    if (!this.isOpened) {
      return 0;
    }

    return this.descriptionRef.nativeElement.scrollHeight;
  }

  public toggleDescription(): void {
    this.isOpened = !this.isOpened;
  }
}
