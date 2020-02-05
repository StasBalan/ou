import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { RegisterHttpService } from '@services/register-http.service';

import { Spinner } from '@shared/spinner/spinner';
import { IRegisterData } from '@models/register.models';
import { ICustomField } from '@models/form.models';
import { registerFormConfig } from './register.config';
import { RegisterDataObject } from '../../classes/register-data';

@Component({
  selector: 'ou-registration',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent extends Spinner implements OnInit {
  public registerForm: FormGroup;
  public readonly registerFormConfig: ICustomField[] = registerFormConfig;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly registerHttpService: RegisterHttpService,
    private readonly cdRef: ChangeDetectorRef,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public handleRegister(): void {
    // TODO: Сделать вывод ошибки если форма не валидна
    if (!this.registerForm.valid || this.loadingProcess) {
      return;
    }

    this.showSpinner();

    const registerDataObject: IRegisterData = new RegisterDataObject(this.registerForm.value);

    this.registerHttpService.register(registerDataObject)
      .subscribe(
        () => this.router.navigate(['/login']),
        (error: Error) => {
          // TODO: Обработка ошибок
          this.hideSpinner();
          this.cdRef.markForCheck();
        },
      );
  }

  private initForm(): void {
    this.registerForm = this.formBuilder.group(this.registerFormConfig.reduce((prev, curr) => ({
      ...prev,
      [curr.control.name] : [curr.control.initialValue, curr.control.validators],
    }), {}));
  }
}
