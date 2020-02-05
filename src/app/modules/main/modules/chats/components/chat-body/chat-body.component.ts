import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input,
  ViewChildren,
  QueryList,
  AfterViewInit,
  ElementRef,
  OnDestroy
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ChatsService } from '../../services/chats.service';
import { ChatsHttpService } from '../../services/chats-http.service';

import { MessageItemComponent } from '../message-item/message-item.component';

import { IUser } from '@models/user.models';
import { IMessageToClientData, IFullChatData } from '../../models/chat.model';
import { MessageDataToSend } from '../../classes/message-data-to-send';

@Component({
  selector: 'ou-chat-body',
  templateUrl: './chat-body.component.html',
  styleUrls: ['./chat-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatBodyComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  public set currentChatId(value: string) {
    if (value !== null) {
      this.subOnMessages(value);
      this.initChatData(value);

      this._currentChatId = value;
    }
  }

  @ViewChildren(MessageItemComponent, { read: ElementRef })
  private messageNodeList: QueryList<ElementRef>;

  public chatName: string;
  public messages: IMessageToClientData[] = [];
  public textMessageControl: FormControl;
  public user: IUser;

  // tslint:disable-next-line: variable-name
  private _currentChatId: string;
  private destroySubscriptions$: Subject<void> = new Subject<void>(); //todo: вынести в отдельный класс

  constructor(
    private readonly chatsService: ChatsService,
    private readonly chatHttpService: ChatsHttpService,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.user = this.chatsService.getUser();
    this.initTextMessageControll();
  }

  public ngAfterViewInit(): void {
    this.subOnScrollToLatestMessage();
  }

  public ngOnDestroy(): void {
    this.destroySubscriptions$.next();
    this.destroySubscriptions$.complete();
  }

  public trackByMessage(_, message: IMessageToClientData): number {
    return message.messageId;
  }

  public sendMessage(): void {
    const pureMessageText = this.textMessageControl.value.trim();

    if (!this.textMessageControl.valid || pureMessageText.length === 0) {
      return;
    }

    const messageDataToSend = new MessageDataToSend(this._currentChatId, this.user, pureMessageText);

    this.chatsService.send(messageDataToSend);
    this.textMessageControl.setValue('');
  }

  private subOnMessages(chatId: string): void {
    this.destroySubscriptions$.next();

    this.chatsService.onMessage(chatId)
      .pipe(
        takeUntil(this.destroySubscriptions$)
      )
      .subscribe((value: IMessageToClientData) => {
        this.messages.push(value);

        this.cdRef.markForCheck();
      });
  }

  private initTextMessageControll(): void {
    this.textMessageControl = new FormControl('', Validators.required);
  }

  private initChatData(chatId: string): void {
    this.chatHttpService.getFullChatData(chatId)
      .subscribe((data: IFullChatData) => {
        this.messages = data.messages;
        this.chatName = data.chatName;

        this.cdRef.markForCheck();
      });
  }

  private subOnScrollToLatestMessage(): void {
    this.messageNodeList.changes
      .subscribe((value: QueryList<ElementRef>) => {
        value.last.nativeElement.scrollIntoView({ behavior: 'smooth' });
      });
  }
}
