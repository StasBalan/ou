import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API, AUTH_HEADERS } from '@constants';

@Injectable()
export class HeaderHttpService {
  constructor(
    private readonly http: HttpClient,
  ) {}

  // TODO: Подумать над смещением данного функционала в общий сервис для повсеместного использования
  public getAvatarData(fileName: string): Observable<ArrayBuffer> {
    return this.http.get(API.getAvatarData(fileName), {
      headers: AUTH_HEADERS(),
      responseType: 'arraybuffer',
    });
  }
}
