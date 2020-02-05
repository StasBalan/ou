import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ChangeDetectorRef, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

import { FilesService } from '@services/files.service';

import { IUser, RolesNames } from '@models/user.models';

@Component({
  selector: 'ou-user-panel-card',
  templateUrl: './user-panel-card.component.html',
  styleUrls: ['./user-panel-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPanelCardComponent implements OnInit {
  @Input()
  public user: IUser;

  @Output()
  public editUser: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public deleteUser: EventEmitter<void> = new EventEmitter<void>();

  public avatarUrl: SafeUrl = null;

  constructor(
    private readonly filesService: FilesService,
    private readonly cdRef: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.initAvatarUrl();
  }

  get fullName(): string {
    return `${this.user.firstName} ${this.user.lastName}`;
  }

  get roleName(): string {
    return RolesNames[this.user.roleId];
  }

  public onEdit(): void {
    this.editUser.emit();
  }

  public onDelete(): void {
    this.deleteUser.emit();
  }

  private initAvatarUrl(): void {
    if (!!this.user.avatar.id) {
      this.filesService.getImageUrl(this.user)
        .subscribe((avatarUrl: SafeUrl) => {
          this.avatarUrl = avatarUrl;

          this.cdRef.markForCheck();
        });
    }
  }
}
