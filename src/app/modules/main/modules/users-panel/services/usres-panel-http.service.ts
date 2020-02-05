import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthHttpService } from '@auth/auth-http.service';

import { API } from '@constants';
import { IUser } from '@models/user.models';
import { ISuccessResponse } from '@models/common.models';
import { IModifyUserData } from '../models/users-panel.models';

@Injectable()
export class UsersPanelHttpsService {
  constructor(
    private readonly authHttpService: AuthHttpService,
  ) {}

  public getAllUsers(): Observable<IUser[]> {
    return this.authHttpService.authGet<IUser[]>(API.getAllUses);
  }

  public modifyUser(modifyUserData: IModifyUserData, userId: number): Observable<ISuccessResponse> {
    return this.authHttpService.authPatch<IModifyUserData, ISuccessResponse>(API.modifyUser(userId), modifyUserData);
  }

  public deleteUser(userId: number): Observable<ISuccessResponse> {
    return this.authHttpService.authDelete<ISuccessResponse>(API.deleteUser(userId));
  }
}
