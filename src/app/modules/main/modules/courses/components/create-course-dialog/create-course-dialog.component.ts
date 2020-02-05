import { Component, ChangeDetectionStrategy, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CoursesHttpService } from '../../services/courses-http.service';

import { DialogOverlayRef } from '@shared/dialog/dialog-overlay-ref.class';
import { Spinner } from '@shared/spinner/spinner';
import { ICustomField } from '@models/form.models';
import { CreateCourseFormConfig } from './create-course-form.config';
import { ICreateCourseData } from '../../models/courses.model';
import { CreateCourseDataObject } from '../../classes/create-course-data';

@Component({
  selector: 'ou-join-course-dialog',
  templateUrl: './create-course-dialog.component.html',
  styleUrls: ['./create-course-dialog.component.scss'],
  providers: [CoursesHttpService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCourseDialogComponent extends Spinner implements OnInit {
  public createCourseForm: FormGroup;
  public readonly createCourseFormConfig: ICustomField[] = CreateCourseFormConfig;

  constructor(
    @Inject(DialogOverlayRef) public readonly dialogRef: DialogOverlayRef,
    private readonly formBuilder: FormBuilder,
    private readonly coursesHttpService: CoursesHttpService,
    private readonly cdRef: ChangeDetectorRef,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public saveChanges(): void {
    const createCourseData: ICreateCourseData = new CreateCourseDataObject(this.createCourseForm.value);

    this.showSpinner();

    this.coursesHttpService.createCourse(createCourseData)
      .subscribe(() => {
          this.dialogRef.close();
      },
        (error: Error) => {
          // TODO: Обработка ошибок
          this.hideSpinner();
          this.cdRef.markForCheck();
        },
      );
  }

  private initForm(): void {
    this.createCourseForm = this.formBuilder.group(this.createCourseFormConfig.reduce((prev, curr) => ({
      ...prev,
      [curr.control.name]: [curr.control.initialValue, curr.control.validators],
    }), {}));
  }
}
