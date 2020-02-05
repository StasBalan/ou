import { IFile } from './common.models';

export enum Roles {
  Teacher = 1,
  Student = 2,
  Admin = 3,
}

export const RolesNames: { [key in Roles]: string } = {
  [Roles.Teacher]: 'Преподаватель',
  [Roles.Student]: 'Студент',
  [Roles.Admin]: 'Администратор',
};

export interface IUser {
  userId: number;
  roleId: Roles;
  login: string;
  firstName: string;
  lastName: string;
  educationalInstitution: string;
  email: string;
  registeredAt: string;
  entryId: number;
  enteredAt: string;
  leftAt: string;
  statusId: number;
  themeName: string;
  languageName: string;
  avatar: IFile;
}
