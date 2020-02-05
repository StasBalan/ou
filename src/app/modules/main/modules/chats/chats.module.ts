import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material';

import { ChatsRoutingModule } from './chats-routing.module';

import { ChatsService } from './services/chats.service';
import { ChatsHttpService } from './services/chats-http.service';

import { ChatsComponent } from './components/chats/chats.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatListItemComponent } from './components/chat-list-item/chat-list-item.component';
import { ChatBodyComponent } from './components/chat-body/chat-body.component';
import { MessageItemComponent } from './components/message-item/message-item.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    ChatsRoutingModule,
  ],
  declarations: [
    ChatsComponent,
    ChatListComponent,
    ChatListItemComponent,
    ChatBodyComponent,
    MessageItemComponent,
  ],
  providers: [
    ChatsService,
    ChatsHttpService,
  ],
})
export class ChatsModule {}
