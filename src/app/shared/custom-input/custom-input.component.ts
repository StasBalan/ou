import { Component, ChangeDetectionStrategy, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, ValidationErrors } from '@angular/forms';

import { ICustomField } from '@models/form.models';

@Component({
  selector: 'ou-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomInputComponent),
    multi: true,
  }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomInputComponent implements ControlValueAccessor {
  @Input()
  public field: ICustomField;

  @Input()
  public formControl: FormControl;

  public onTouched = () => {};
  public onChange = (value: string) => {};

  public writeValue(value: any): void {
    if (!this.formControl) {
      this.initControl();
    }
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public get isFieldInvalid(): boolean {
    return this.errorMessage.length > 0 && (this.formControl.touched || this.formControl.dirty);
  }

  public get errorMessage(): string  {
    const controlErrors = this.formControl.errors;

    if (!controlErrors) {
      return '';
    }

    return this.getCurrentErrorMessage(controlErrors);
  }

  private getCurrentErrorMessage(controlErrors: ValidationErrors): string {
    switch (true) {
      case !!controlErrors.required:
        return 'Поле должно быть заполнено!';
      case !!controlErrors.email:
        return 'Введен некорректный e-mail';
      case !!controlErrors.maxlength:
        return 'Превышено допустимое количество символов!';
      default:
        return '';
    }
  }

  private initControl(): void {
    this.formControl = new FormControl(this.field.control.initialValue, this.field.control.validators);
  }
}
