import { IRegisterData } from '@models/register.models';
import { Roles } from '@models/user.models';

export class RegisterDataObject implements IRegisterData {
  public roleId: Roles;
  public firstName: string;
  public lastName: string;
  public login: string;
  public educationalInstitution: string;
  public email: string;
  public password: string;

  constructor({
    roleId,
    firstName,
    lastName,
    login,
    educationalInstitution,
    email,
    password
  }) {
    this.roleId = roleId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.login = login;
    this.educationalInstitution = educationalInstitution;
    this.email = email;
    this.password = password;
  }
}
