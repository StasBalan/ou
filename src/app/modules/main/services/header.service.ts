import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LocalStorageService } from '@services/local-storage.service';
import { HeaderHttpService } from './header-http.service';

import { IUser } from '@models/user.models';
import { IFile } from '@models/common.models';
import { LocalStorageKeys } from '@constants';
import { arrayBufferToBase64 } from '@functions/array-buffer-to-base64';

@Injectable()
export class HeaderService {
  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly headerHttpService: HeaderHttpService,
    private readonly sanitizer: DomSanitizer,
  ) {}

  public getUser(): IUser {
    return this.localStorageService.getItem<IUser>(LocalStorageKeys.User);
  }

  public getAvatarUrl(userAvatar: IFile): Observable<SafeUrl> {
    return this.headerHttpService.getAvatarData(userAvatar.name)
      .pipe(
        map((buffer: ArrayBuffer) => {
          const base64 = arrayBufferToBase64(buffer);
          const avatarUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(`data:${userAvatar.mimeType};base64, ${base64}`);

          return avatarUrl;
        }),
      );
  }
}
