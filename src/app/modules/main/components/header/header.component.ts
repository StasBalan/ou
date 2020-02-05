import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SafeUrl } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { HeaderService } from '../../services/header.service';
import { AuthService } from '@auth/auth.service';
import { GlobalSettingsService } from '@services/global-settings.service';

import { IUser, RolesNames } from '@models/user.models';

@Component({
  selector: 'ou-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [
    HeaderService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  public user: IUser;
  public avatarUrl: SafeUrl = null;

  private readonly destroySubscriptions$: Subject<void> = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly headerService: HeaderService,
    private readonly authService: AuthService,
    private readonly globalSettingsService: GlobalSettingsService,
    private readonly cdRef: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.initUser();
    this.initAvatar();
    this.subOnGlobalSettingsChange();
  }

  public ngOnDestroy(): void {
    this.destroySubscriptions$.next();
    this.destroySubscriptions$.complete();
  }

  public get fullName(): string {
    return `${this.user.firstName} ${this.user.lastName}`;
  }

  public get roleName(): string {
    return RolesNames[this.user.roleId];
  }

  public logout(): void {
    this.authService.logoutUser()
      .then(() => this.router.navigate(['/login']));
  }

  private initUser(): void {
    this.user = this.headerService.getUser();
  }

  private initAvatar(): void {
    if (!this.user.avatar.id) {
      return;
    }

    this.headerService.getAvatarUrl(this.user.avatar)
      .subscribe((avatarUrl: SafeUrl) => {
        this.avatarUrl = avatarUrl;

        this.cdRef.markForCheck();
      });
  }

  private subOnGlobalSettingsChange(): void {
    this.globalSettingsService.settingsUpdated$
      .pipe(
        takeUntil(this.destroySubscriptions$),
      )
      .subscribe(() => {
        this.initUser();
        this.initAvatar();
      });
  }
}
