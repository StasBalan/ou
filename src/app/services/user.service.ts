import { Injectable } from '@angular/core';

import { LocalStorageService } from './local-storage.service';

import { LocalStorageKeys } from '@constants';
import { IUser } from '@models/user.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private readonly localStorageService: LocalStorageService,
  ) {}

  public getCurrentUser(): IUser {
    return this.localStorageService.getItem<IUser>(LocalStorageKeys.User);
  }
}
