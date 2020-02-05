import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

import { LocalStorageService } from '@services/local-storage.service';
import { LoginHttpService } from '@services/login-http.service';

import { ILoginData, ITokenObject } from '@models/login.models';
import { IUser } from '@models/user.models';
import { LocalStorageKeys } from '@constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly loginHttpService: LoginHttpService,
  ) {}

  public isAuthenticated(): boolean {
    return this.localStorageService.has(LocalStorageKeys.Token);
  }

  public getToken(): string {
    return this.localStorageService.getItem<string>(LocalStorageKeys.Token);
  }

  public loginUser(loginData: ILoginData): Observable<void> {
    return this.loginHttpService.login(loginData).pipe(
      flatMap((tokenObject: ITokenObject) => {
        const { token } = tokenObject;

        if (!!token) {
          this.saveTokenToLocalStorage(token);

          return this.getTokenUserData(token);
        }

        // TODO: Здесь должна быть ошибка
      })
    );
  }

  // TODO: Отсылать запрос о выходе на бек
  public logoutUser(): Promise<void> {
    return new Promise((resolve) => {
      this.clearLocalStorage();

      resolve();
    });
  }

  private getTokenUserData(token: string): Observable<void> {
    return this.loginHttpService.getUserInfo(token).pipe(
      map((user: IUser) => {
        if (!!user.userId) {
          this.saveUserToLocalStorage(user);
        }

        // TODO: Здесь должна быть ошибка
      })
    );
  }

  private saveTokenToLocalStorage(token: string): void {
    this.localStorageService.setItem<string>(LocalStorageKeys.Token, token);
  }

  private saveUserToLocalStorage(user: IUser): void {
    this.localStorageService.setItem<IUser>(LocalStorageKeys.User, user);
  }

  private clearLocalStorage(): void {
    this.localStorageService.removeItem(LocalStorageKeys.Token);
    this.localStorageService.removeItem(LocalStorageKeys.User);
  }
}
