import { Component, ChangeDetectionStrategy, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { CoursesHttpService } from '../../services/courses-http.service';

import { Spinner } from '@shared/spinner/spinner';
import { DialogOverlayRef } from '@shared/dialog/dialog-overlay-ref.class';
import { ICustomField } from '@models/form.models';
import { ICourseCode, IJoinedCourseData } from '../../models/courses.model';
import { CourseCodeObject } from '../../models/course-code-object.models';
import { courseCodeControlConfig } from './join-course-dialog.config';

@Component({
  selector: 'ou-join-course-dialog',
  templateUrl: './join-course-dialog.component.html',
  styleUrls: ['./join-course-dialog.component.scss'],
  providers: [CoursesHttpService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JoinCourseDialogComponent extends Spinner implements OnInit {
  public courseCodeControl: FormControl;
  public courseCodeControlConfig: ICustomField = courseCodeControlConfig;

  constructor(
    @Inject(DialogOverlayRef) public readonly dialogRef: DialogOverlayRef,
    private readonly courseHttpService: CoursesHttpService,
    private readonly router: Router,
    private readonly cdRef: ChangeDetectorRef,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.initControl();
  }

  public joinCourse(): void {
    if (this.courseCodeControl.invalid || this.loadingProcess) {
      return;
    }

    this.showSpinner();

    const code: string = this.courseCodeControl.value;
    const courseCodeObject: ICourseCode = new CourseCodeObject(code);

    this.courseHttpService.joinCourse(courseCodeObject)
      .subscribe(
        (response: IJoinedCourseData) => {
          this.dialogRef.close();

          this.router.navigate(['courses', response.joinedCourseId], {
            state: {
              fromCourseList: true,
            },
          });
        },
        (error: Error) => {
          this.hideSpinner();

          this.cdRef.markForCheck();
        });
  }

  private initControl(): void {
    this.courseCodeControl = new FormControl(
      this.courseCodeControlConfig.control.initialValue,
      this.courseCodeControlConfig.control.validators,
    );
  }
}
