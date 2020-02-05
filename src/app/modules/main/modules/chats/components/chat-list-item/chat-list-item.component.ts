import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { IShortChatData } from '../../models/chat.model';

@Component({
  selector: 'ou-chat-list-item',
  templateUrl: 'chat-list-item.component.html',
  styleUrls: ['./chat-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ChatListItemComponent {
  @Input()
  public chatData: IShortChatData;
}
