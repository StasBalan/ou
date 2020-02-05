import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { IMessageToClientData } from '../../models/chat.model';

@Component({
  selector: 'ou-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageItemComponent {
  @Input()
  public messageData: IMessageToClientData;

  @Input()
  public userId: number;

  public get isMyMessage(): boolean {
    return this.messageData.userId === this.userId;
  }
}
