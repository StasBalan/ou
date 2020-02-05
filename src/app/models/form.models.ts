import { AbstractControl, ValidationErrors } from '@angular/forms';

export interface ICustomField {
  id: string;
  label: string;
  type: FieldTypes;
  required: boolean;
  placeholder: string;
  control: ICustomControl;
  matIcon?: string;
}

export interface ICustomControl {
  name: string;
  initialValue: string;
  validators: ((control: AbstractControl) => ValidationErrors)[];
}

export enum FieldTypes {
  Text = 'text',
  Number = 'number',
  Password = 'password',
  Email = 'email',
}
