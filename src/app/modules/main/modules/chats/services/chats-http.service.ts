import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthHttpService } from '@auth/auth-http.service';

import { API } from '@constants';
import { IShortChatData, IFullChatData } from '../models/chat.model';

@Injectable()
export class ChatsHttpService {
  constructor(
    private readonly authHttpService: AuthHttpService,
  ) {}

  public getChats(): Observable<IShortChatData[]> {
    return this.authHttpService.authGet<IShortChatData[]>(API.getChats);
  }

  public getFullChatData(chatId: string): Observable<IFullChatData> {
    return this.authHttpService.authGet<IFullChatData>(API.getFullChatData(chatId));
  }
}
