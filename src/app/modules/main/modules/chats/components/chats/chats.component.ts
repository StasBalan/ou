import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';

import { ChatsHttpService } from '../../services/chats-http.service';

import { IShortChatData } from '../../models/chat.model';

@Component({
  selector: 'ou-main-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsComponent implements OnInit {
  public chatList: IShortChatData[];
  public currentChatId: string = null;

  constructor(
    private readonly chatsHttpService: ChatsHttpService,
    private readonly cdRef: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.initChatList();
  }

  public setCurrentChatId(chatId: string): void {
    this.currentChatId = chatId;
  }

  private initChatList(): void {
    this.chatsHttpService.getChats()
      .subscribe((chats: IShortChatData[]) => {
        this.chatList = chats;

        this.cdRef.markForCheck();
      });
  }
}
