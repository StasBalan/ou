import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { DialogService } from '@shared/dialog/dialog.service';

import { CreateCourseDialogComponent } from '../create-course-dialog/create-course-dialog.component';

@Component({
  selector: 'ou-courses-teacher',
  templateUrl: './courses-teacher.component.html',
  styleUrls: ['../../styles/courses.styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesTeacherComponent implements OnInit, OnDestroy {
  public searchControl: FormControl;
  public valueToSearch = '';

  private destroySubscriptions$: Subject<void> = new Subject<void>();

  constructor(
    private readonly dialogService: DialogService,
    private readonly cdRef: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.initControl();
    this.subOnSearchInput();
  }

  public ngOnDestroy(): void {
    this.destroySubscriptions$.next();
    this.destroySubscriptions$.complete();
  }

  public openCreateCourseDialog(): void {
    this.dialogService.open(CreateCourseDialogComponent);
  }

  private initControl(): void {
    this.searchControl = new FormControl('');
  }

  private subOnSearchInput(): void {
    this.searchControl.valueChanges
      .pipe(
        takeUntil(this.destroySubscriptions$),
        debounceTime(100),
        distinctUntilChanged(),
      )
      .subscribe((valueToSearch: string) => {
        this.valueToSearch = valueToSearch;

        this.cdRef.markForCheck();
      });
  }
}
