import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';

import { Spinner } from '@shared/spinner/spinner';
import { ILoginData } from '@models/login.models';
import { ICustomField } from '@models/form.models';
import { loginFormConfig } from './login.config';

@Component({
  selector: 'ou-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent extends Spinner implements OnInit {
  public loginForm: FormGroup;
  public readonly loginFormConfig: ICustomField[] = loginFormConfig;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly cdRef: ChangeDetectorRef,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public handleSubmit(): void {
    // TODO: Сделать вывод ошибки если форма не валидна
    if (!this.loginForm.valid || this.loadingProcess) {
      return;
    }

    this.showSpinner();

    const credentials: ILoginData = this.loginForm.value;

    this.authService.loginUser(credentials)
      .subscribe(
        () => this.router.navigate(['']),
        (error: Error) => {
          // TODO: Обработка ошибок
          this.hideSpinner();
          this.cdRef.markForCheck();
        },
      );
  }

  private initForm(): void {
    this.loginForm = this.formBuilder.group(this.loginFormConfig.reduce((prev, curr) => ({
      ...prev,
      [curr.control.name]: [curr.control.initialValue, curr.control.validators],
    }), {}));
  }
}
