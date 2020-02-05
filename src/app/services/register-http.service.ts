import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IRegisterData } from '@models/register.models';
import { ISuccessResponse } from '@models/common.models';
import { DEFAULT_HEADERS, API } from '@constants';

@Injectable({
  providedIn: 'root'
})
export class RegisterHttpService {
  constructor(
    private readonly http: HttpClient,
  ) {}

  public register(registerData: IRegisterData): Observable<ISuccessResponse> {
    return this.http.post<ISuccessResponse>(API.registerUser, registerData, { headers: DEFAULT_HEADERS });
  }
}
