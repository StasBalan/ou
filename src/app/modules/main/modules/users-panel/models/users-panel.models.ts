import { Roles } from '@models/user.models';

export interface IModifyUserData {
  firstName?: string;
  lastName?: string;
  roleId?: Roles;
  educationalInstitution?: string;
  login?: string;
  email?: string;
}
