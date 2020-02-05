import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { AuthHttpService } from '@auth/auth-http.service';
import { LocalStorageService } from './local-storage.service';

import { IUser } from '@models/user.models';
import { API, LocalStorageKeys } from '@constants';

@Injectable({
  providedIn: 'root'
})
export class GlobalSettingsService {
  public readonly settingsUpdated$: Subject<void> = new Subject<void>();

  constructor(
    private readonly authHttpService: AuthHttpService,
    private readonly localStorageService: LocalStorageService,
  ) {}

  public updateSettings(): void {
    this.authHttpService.authGet(API.getCurrentUser)
      .subscribe((user: IUser) => {
        this.localStorageService.setItem<IUser>(LocalStorageKeys.User, user);

        this.settingsUpdated$.next();
      });
  }
}
