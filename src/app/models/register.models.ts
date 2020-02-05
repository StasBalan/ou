import { Roles } from './user.models';

export interface IRegisterData {
  roleId: Roles;
  firstName: string;
  lastName: string;
  login: string;
  educationalInstitution: string;
  email: string;
  password: string;
}
