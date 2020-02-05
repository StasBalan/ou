import { Validators } from '@angular/forms';

import { FieldTypes, ICustomField } from '@models/form.models';

export const CreateCourseFormConfig: ICustomField[] = [
  {
    id: 'courseName',
    type: FieldTypes.Text,
    label: 'Название курса',
    required: true,
    placeholder: 'Введите название курса',
    control: {
      name: 'courseName',
      initialValue: '',
      validators: [
        Validators.required,
      ],
    }
  },
  {
    id: 'courseGroupName',
    type: FieldTypes.Text,
    label: 'Группа курса',
    required: true,
    placeholder: 'Введите группу курса',
    control: {
      name: 'courseGroupName',
      initialValue: '',
      validators: [
        Validators.required,
      ],
    }
  },
  {
    id: 'courseDescription',
    type: FieldTypes.Text,
    label: 'Описание курса',
    required: true,
    placeholder: 'Введите описание курса',
    control: {
      name: 'courseDescription',
      initialValue: '',
      validators: [
        Validators.required,
      ],
    }
  },
  {
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
    }
  },
];
