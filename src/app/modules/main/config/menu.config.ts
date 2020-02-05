import { ILinkItem } from '../models/link-items.models';

export const commonMenuItems: ILinkItem[] = [
  { label: 'Настройки', matIcon: 'tune', href: '/settings' },
];

export const teachersAndStudentsMenuItems: ILinkItem[] = [
  { label: 'Курсы', matIcon: 'library_books', href: '/courses' },
  { label: 'Сообщения', matIcon: 'comment', href: '/chats' },
  ...commonMenuItems,
];

export const adminMenuItems: ILinkItem[] = [
  { label: 'Пользователи', matIcon: 'format_list_bulleted', href: '/users-panel' },
  ...commonMenuItems,
];
