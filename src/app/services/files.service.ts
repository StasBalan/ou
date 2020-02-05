import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { Observable, of, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

import { LocalStorageService } from './local-storage.service';

import { LocalStorageKeys, AUTH_HEADERS, API } from '@constants';
import { IUser } from '@models/user.models';
import { arrayBufferToBase64 } from '@functions/array-buffer-to-base64';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  constructor(
    private readonly http: HttpClient,
    private readonly sanitizer: DomSanitizer,
    private readonly localStorageService: LocalStorageService,
  ) {}

  public getAvatarUrl(): Observable<SafeUrl> {
    const user: IUser = this.localStorageService.getItem<IUser>(LocalStorageKeys.User);

    return this.getImageUrl(user);
  }

  public getImageUrl(user: IUser): Observable<SafeUrl> {
    if (!user.avatar.id) {
      return of(null);
    }

    const { name, mimeType } = user.avatar;

    return this.getFileData(name)
      .pipe(
        map((buffer: ArrayBuffer) => {
          const base64: string = arrayBufferToBase64(buffer);

          const imageUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(`data:${mimeType};base64, ${base64}`);

          return imageUrl;
        }),
      );
  }

  public getImageUrlFromFile(file: File): Observable<SafeUrl> {
    const fileReader = new FileReader();
    const onLoadEnd = fromEvent(fileReader, 'loadend')
      .pipe(
        map(() => fileReader.result),
      );

    fileReader.readAsDataURL(file);

    return onLoadEnd;
  }

  private getFileData(fileName: string): Observable<ArrayBuffer> {
    return this.http.get(API.getAvatarData(fileName), {
      headers: AUTH_HEADERS(),
      responseType: 'arraybuffer',
    });
  }
}
