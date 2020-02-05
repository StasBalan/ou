import { Validators } from '@angular/forms';

import { FieldTypes, ICustomField } from '@models/form.models';

export const registerFormConfig: ICustomField[] = [
  {
    id: 'firstName',
    type: FieldTypes.Text,
    label: 'Имя',
    required: true,
    placeholder: 'Введите имя',
    control: {
      name: 'firstName',
      initialValue: '',
      validators: [
        Validators.required,
      ],
    },
  },
  {
    id: 'lastName',
    type: FieldTypes.Text,
    label: 'Фамилия',
    required: true,
    placeholder: 'Введите фамилию',
    control: {
      name: 'lastName',
      initialValue: '',
      validators: [
        Validators.required,
      ],
    },
  },
  {
    id: 'educationalInstitution',
    type: FieldTypes.Text,
    label: 'Учреждение оброзования',
    required: true,
    placeholder: 'Введите УО',
    control: {
      name: 'educationalInstitution',
      initialValue: '',
      validators: [
        Validators.required,
      ],
    },
  },
  {
    id: 'roleId',
    type: FieldTypes.Text,
    label: 'Роль',
    required: true,
    placeholder: 'Выберите роль',
    control: {
      name: 'roleId',
      initialValue: '',
      validators: [
        Validators.required,
      ],
    },
  },
  {
    id: 'login',
    type: FieldTypes.Text,
    label: 'Логин',
    required: true,
    placeholder: 'Введите логин',
    control: {
      name: 'login',
      initialValue: '',
      validators: [
        Validators.required,
      ],
    },
  },
  {
    id: 'email',
    type: FieldTypes.Email,
    label: 'E-mail',
    required: true,
    placeholder: 'Введите E-mail',
    control: {
      name: 'email',
      initialValue: '',
      validators: [
        Validators.required,
        Validators.email,
      ],
    },
  },
  {
    id: 'password',
    type: FieldTypes.Password,
    label: 'Пароль',
    required: true,
    placeholder: 'Введите пароль',
    control: {
      name: 'password',
      initialValue: '',
      validators: [
        Validators.required,
      ],
    },
  },
  {
    id: 'repeatedPassword',
    type: FieldTypes.Password,
    label: 'Повторный пароль',
    required: true,
    placeholder: 'Введите пароль ещё раз',
    control: {
      name: 'repeatedPassword',
      initialValue: '',
      validators: [
        Validators.required,
      ],
    },
  },
];
