import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import io from 'socket.io-client';

import { API_URL, LocalStorageKeys } from '@constants';
import { IUser } from '@models/user.models';
import { IMessageToClientData } from '../models/chat.model';
import { MessageDataToSend } from '../classes/message-data-to-send';

@Injectable()
export class ChatsService {
  private socket: io.Socket;

  constructor() {
    this.initServer();
  }

  public onMessage(chatId: string): Observable<IMessageToClientData> {
    return new Observable(observer => {
      this.socket.on(
        `msgToClient:chatId${chatId}`,
        (messageData: IMessageToClientData) => observer.next(messageData),
      );
    });
  }

  public send(data: MessageDataToSend): void {
    this.socket.emit('msgToServer', data);
  }

  public getUser(): IUser {
    return JSON.parse(localStorage.getItem(LocalStorageKeys.User));
  }

  private initServer(): void {
    this.socket = io(API_URL);
  }
}
