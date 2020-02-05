import { Component, ChangeDetectionStrategy, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { UsersPanelHttpsService } from '../../services/usres-panel-http.service';

import { Spinner } from '@shared/spinner/spinner';
import { DIALOG_DATA } from '@shared/dialog/dialog.service';
import { DialogOverlayRef } from '@shared/dialog/dialog-overlay-ref.class';
import { ICustomField } from '@models/form.models';
import { IUser } from '@models/user.models';
import { IModifyUserData } from '../../models/users-panel.models';
import { userEditFormConfig } from '../../config/user-edit-form.config';

@Component({
    selector: 'ou-user-edit-dialog',
    templateUrl: './user-edit-dialog.component.html',
    styleUrls: ['./user-edit-dialog.component.scss'],
    providers: [
      UsersPanelHttpsService,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEditDialogComponent extends Spinner implements OnInit {
    public userEditFormConfig: ICustomField[] = userEditFormConfig;
    public chunkedUserEditFormConfig: Array<ICustomField[]> = [];
    public userEditForm: FormGroup;

    private initialFormValueSnapshot: IModifyUserData = {};

    constructor(
        @Inject(DialogOverlayRef) public readonly dialogRef: DialogOverlayRef,
        @Inject(DIALOG_DATA) private readonly data: { value: IUser },
        private readonly formBuilder: FormBuilder,
        private readonly usersPanelHttpsService: UsersPanelHttpsService,
    ) {
      super();
    }

    public ngOnInit(): void {
        this.setInitialValues();
        this.initForm();
    }

    public saveChanges(): void {
      if (this.isFormDirty()) {
        this.showSpinner();

        this.usersPanelHttpsService.modifyUser(
          this.getChangedValuesObject(),
          this.data.value.userId,
        ).subscribe((_) => {
          this.hideSpinner();

          this.dialogRef.close(true);

          // TODO: Show alert
        });
      }
    }

    public closeDialog(): void {
      this.dialogRef.close();
    }

    public isFormDirty(): boolean {
      if (!this.userEditForm.dirty) {
        return false;
      }

      return !Object.keys(this.initialFormValueSnapshot).every(
        (key: string) => (this.pureValue(this.userEditForm.value[key]) === this.pureValue(this.initialFormValueSnapshot[key])),
      );
    }

    private pureValue(value: any): string {
      return value.toString().trim();
    }

    private getChangedValuesObject(): IModifyUserData {
      const finalData: IModifyUserData = {};

      Object.keys(this.initialFormValueSnapshot).forEach(
        (key: string) => {
          if (this.initialFormValueSnapshot[key] !== this.userEditForm.value[key]) {
            finalData[key] = this.userEditForm.value[key];
          }
        },
      );

      return finalData;
    }

    private setInitialValues(): void {
      this.userEditFormConfig = this.userEditFormConfig.map((fieldConfig: ICustomField) => {
        fieldConfig.control.initialValue = this.data.value[fieldConfig.control.name];

        this.initialFormValueSnapshot[fieldConfig.control.name] = fieldConfig.control.initialValue;

        return fieldConfig;
      });
    }

    private initForm(): void {
        this.userEditForm = this.formBuilder.group(
            this.userEditFormConfig.reduce(
                (prev, curr) => ({
                    ...prev,
                    [curr.control.name]: [curr.control.initialValue, curr.control.validators],
                }), {},
            ),
        );
    }
}
