import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

import { DEFAULT_HEADERS } from '@constants';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {
  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService,
  ) {}

  public authGet<T>(requestUrl: string): Observable<T> {
    return this.http.get<T>(requestUrl, { headers: this.getAuthHeaders() });
  }

  public authPost<I, O>(requestUrl: string, data: I): Observable<O> {
    return this.http.post<O>(requestUrl, data, { headers: this.getAuthHeaders() });
  }

  public authPatch<I, O>(requestUrl: string, data: I): Observable<O> {
    return this.http.patch<O>(requestUrl, data, { headers: this.getAuthHeaders() });
  }

  public authDelete<T>(requestUrl: string): Observable<T> {
    return this.http.delete<T>(requestUrl, { headers: this.getAuthHeaders() });
  }

  private getAuthHeaders(): HttpHeaders {
    return DEFAULT_HEADERS.append('Authorization', `Bearer ${this.authService.getToken()}`);
  }
}
