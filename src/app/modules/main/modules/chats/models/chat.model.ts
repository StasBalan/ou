import { IUser } from '@models/user.models';
import { IFile } from '@models/common.models';

export interface IShortChatData {
  chatId: number;
  chatOwnerId: number;
  chatName: string;
  createdAt: string;
  image: IFile;
}

export interface IFullChatData extends IShortChatData {
  messages: IMessageToClientData[];
  users: IUser[];
}

export interface IMessageToClientData {
  chatId: number;
  messageId: number;
  messageText: string;
  userId: number;
  userEntryId: number;
  sentAt: string;
  authorName: string;
  isRead: boolean;
}
