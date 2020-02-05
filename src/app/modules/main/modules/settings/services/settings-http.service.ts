import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IFile } from '@models/common.models';
import { API, AUTH_HEADERS } from '@constants';

@Injectable()
export class SettingsHttpService {
  constructor(
    private readonly http: HttpClient,
  ) {}

  public uploadAvatar(image: File): Observable<IFile> {
    const formData = new FormData();

    formData.append('avatar', image);

    return this.http.post<IFile>(API.uploadAvatar, formData, {
      headers: AUTH_HEADERS(),
    });
  }
}
