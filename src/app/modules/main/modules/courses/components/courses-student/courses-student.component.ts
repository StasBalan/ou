import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { DialogService } from '@shared/dialog/dialog.service';

import { JoinCourseDialogComponent } from '../join-course-dialog/join-course-dialog.component';

@Component({
  selector: 'ou-courses-student',
  templateUrl: './courses-student.component.html',
  styleUrls: ['../../styles/courses.styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesStudentComponent implements OnInit, OnDestroy {
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

  public openJoinCourseDialog(): void {
    this.dialogService.open(JoinCourseDialogComponent);
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
