import { Validators } from '@angular/forms';

import { ICustomField, FieldTypes } from '@models/form.models';

export const courseCodeControlConfig: ICustomField = {
  id: 'courseCode',
  type: FieldTypes.Text,
  label: 'Код курса',
  required: true,
  placeholder: 'Введите код курса',
  control: {
    name: 'courseCode',
    initialValue: '',
    validators: [
      Validators.required,
    ],
  },
};
