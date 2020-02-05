import { Validators } from '@angular/forms';

import { FieldTypes, ICustomField } from '@models/form.models';

export const userEditFormConfig: ICustomField[] = [
  {
    id: 'firstName',
    type: FieldTypes.Text,
    label: 'Имя',
    required: true,
    placeholder: 'Имя пользователя',
    control: {
      name: 'firstName',
      initialValue: '',
      validators: [
        Validators.required,
      ],
    }
  },
  {
    id: 'lastName',
    type: FieldTypes.Text,
    label: 'Фамилия',
    required: true,
    placeholder: 'Фамилия пользователя',
    control: {
      name: 'lastName',
      initialValue: '',
      validators: [
        Validators.required,
      ],
    }
  },
  {
    id: 'roleId',
    type: FieldTypes.Text,
    label: 'Роль',
    required: true,
    placeholder: 'Роль пользователя',
    control: {
      name: 'roleId',
      initialValue: '',
      validators: [
        Validators.required,
      ],
    }
  },
  {
    id: 'educationalInstitution',
    type: FieldTypes.Text,
    label: 'Учреждение образования',
    required: true,
    placeholder: 'УО пользователя',
    control: {
      name: 'educationalInstitution',
      initialValue: '',
      validators: [
        Validators.required,
      ],
    }
  },
  {
    id: 'login',
    type: FieldTypes.Text,
    label: 'Логин',
    required: true,
    placeholder: 'Логин пользователя',
    control: {
      name: 'login',
      initialValue: '',
      validators: [
        Validators.required,
      ],
    }
  },
  {
    id: 'email',
    type: FieldTypes.Text,
    label: 'Email',
    required: true,
    placeholder: 'Email пользователя',
    control: {
      name: 'email',
      initialValue: '',
      validators: [
        Validators.required,
      ],
    }
  },
];
