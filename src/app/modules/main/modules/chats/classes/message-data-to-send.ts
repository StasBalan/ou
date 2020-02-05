import { IUser } from '@models/user.models';

export class MessageDataToSend {
  constructor(
    public chatId: string,
    public user: IUser,
    public messageText: string,
  ) {}
}
