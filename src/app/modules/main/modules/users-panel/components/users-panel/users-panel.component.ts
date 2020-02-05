import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { UserService } from '@services/user.service';
import { UsersPanelHttpsService } from '../../services/usres-panel-http.service';
import { DialogService } from '@shared/dialog/dialog.service';

import { UserEditDialogComponent } from '../user-edit-dialog/user-edit-dialog.component';

import { Spinner } from '@shared/spinner/spinner';
import { DialogOverlayRef } from '@shared/dialog/dialog-overlay-ref.class';
import { IUser } from '@models/user.models';

@Component({
  selector: 'ou-users-panel',
  templateUrl: './users-panel.component.html',
  styleUrls: ['./users-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPanelComponent extends Spinner implements OnInit, OnDestroy {
  private readonly users$: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  private readonly destroySubscriptions$: Subject<void> = new Subject<void>();

  constructor(
    private readonly userService: UserService,
    private readonly usersPanelHttpService: UsersPanelHttpsService,
    private readonly dialogService: DialogService,
    private readonly cdRef: ChangeDetectorRef,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.initUsers();
  }

  public ngOnDestroy(): void {
    this.destroySubscriptions$.next();
    this.destroySubscriptions$.complete();
  }

  public get usersStream(): Observable<IUser[]> {
    return this.users$.asObservable()
      .pipe(
        map(
          (users: IUser[]) => users.filter(
            (user: IUser) => (this.userService.getCurrentUser().userId !== user.userId),
          ),
        ),
      );
  }

  public onUserEdit(user: IUser): void {
    const dialogRef: DialogOverlayRef = this.dialogService.open(UserEditDialogComponent, {
      data: {
        value: user,
      },
    });

    this.subOnDialogClose(dialogRef);
  }

  public onUserDelete(userToDelete: IUser): void {
    this.usersPanelHttpService.deleteUser(userToDelete.userId)
      .subscribe((_) => {
        this.users$.next(
          this.users$.getValue().filter((user: IUser) => user.userId !== userToDelete.userId),
        );
      });
  }

  public trackByUser(_, user: IUser): number {
    return user.userId;
  }

  private initUsers(): void {
    this.showSpinner();

    this.cdRef.markForCheck();

    this.usersPanelHttpService.getAllUsers()
      .subscribe((users: IUser[]) => {
        this.users$.next(users);

        this.hideSpinner();

        this.cdRef.markForCheck();
      });
  }

  private subOnDialogClose(dialogRef: DialogOverlayRef): void {
    dialogRef.afterClosed$
      .pipe(
        takeUntil(this.destroySubscriptions$),
      )
      .subscribe((userChanged: boolean) => {
        if (userChanged) {
          this.initUsers(); // TODO: Think about updating only the user which was changed
        }
      });
  }
}
