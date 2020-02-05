export interface IDialogData {
  value: any;
}

export interface IDialogConfig {
  data?: IDialogData;
  width?: string;
  height?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
}
