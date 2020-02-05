import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SettingsHttpService } from '../../services/settings-http.service';
import { GlobalSettingsService } from '@services/global-settings.service';
import { FilesService } from '@services/files.service';

import { IFile } from '@models/common.models';

@Component({
  selector: 'ou-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit, OnDestroy {
  public avatarUrl: SafeUrl = null;

  private readonly destroySubscriptions$: Subject<void> = new Subject<void>();

  constructor(
    private readonly settingsHttpService: SettingsHttpService,
    private readonly globalSettingsService: GlobalSettingsService,
    private readonly filesService: FilesService,
    private readonly cdRef: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.initAvatar();
  }

  public ngOnDestroy(): void {
    this.destroySubscriptions$.next();
    this.destroySubscriptions$.complete();
  }

  public newPhotoSelected(files: File[]): void {
    if (!['image/png', 'image/jpeg'].includes(files[0].type)) {
      // TODO: Ошибка

      return;
    }

    this.destroySubscriptions$.next();

    this.filesService.getImageUrlFromFile(files[0])
      .pipe(
        takeUntil(this.destroySubscriptions$),
      )
      .subscribe((newAvatarUrl: SafeUrl) => {
        this.avatarUrl = newAvatarUrl;

        this.cdRef.markForCheck();
      });
  }

  public uploadAvatar(files: File[]): void {
    if (!files.length) {
      return;
    }

    this.settingsHttpService.uploadAvatar(files[0])
      .subscribe((_: IFile) => {
        this.globalSettingsService.updateSettings();
      });
  }

  private initAvatar(): void {
    this.filesService.getAvatarUrl()
      .subscribe((avatarUrl: SafeUrl) => {
        this.avatarUrl = avatarUrl;

        this.cdRef.markForCheck();
      });
  }
}
