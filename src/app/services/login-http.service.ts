import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IUser } from '@models/user.models';
import { ITokenObject, ILoginData } from '@models/login.models';
import { DEFAULT_HEADERS, API } from '@constants';

@Injectable({
  providedIn: 'root'
})
export class LoginHttpService {
  constructor(
    private readonly http: HttpClient,
  ) {}

  public login(loginData: ILoginData): Observable<ITokenObject> {
    return this.http.post<ITokenObject>(API.loginUser, loginData, { headers: DEFAULT_HEADERS });
  }

  public getUserInfo(token: string): Observable<IUser> {
    const headersWithAuth = DEFAULT_HEADERS.append('Authorization', `Bearer ${token}`);

    return this.http.get<IUser>(API.getCurrentUser, { headers: headersWithAuth });
  }
}
