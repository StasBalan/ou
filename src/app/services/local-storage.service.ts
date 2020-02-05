import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { LocalStorageKeys } from '@constants';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly storage: Storage = localStorage;

  constructor(
    private readonly router: Router,
  ) {}

  public setItem<T>(key: LocalStorageKeys, value: T): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  public getItem<T>(key: LocalStorageKeys): T {
    if (!this.has(key)) {
      this.router.navigate(['/login']);

      return {} as T;
    }

    return JSON.parse(this.storage.getItem(key)) as T;
  }

  public has(key: LocalStorageKeys): boolean {
    return !!this.storage.getItem(key);
  }

  public removeItem(key: LocalStorageKeys): void {
    this.storage.removeItem(key);
  }

  public clear(): void {
    this.storage.clear();
  }
}
