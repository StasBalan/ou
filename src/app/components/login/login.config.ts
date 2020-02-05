import { Validators } from '@angular/forms';

import { FieldTypes, ICustomField } from '@models/form.models';

export const loginFormConfig: ICustomField[] = [
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
    }
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
    }
  }
];
