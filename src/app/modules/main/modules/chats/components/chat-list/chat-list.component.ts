import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { IShortChatData } from '../../models/chat.model';

@Component({
  selector: 'ou-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatListComponent {
  @Input()
  public chatList: IShortChatData[];

  @Output()
  public chatSelected: EventEmitter<string> = new EventEmitter<string>();

  public selectChat(chatId: string): void {
    this.chatSelected.emit(chatId);
  }

  public trackByChat(_, chat: IShortChatData): number {
    return chat.chatId;
  }
}
