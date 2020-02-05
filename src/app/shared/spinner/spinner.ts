export class Spinner { //TODO: сделать через сервис
  public loadingProcess = false;

  public showSpinner(): void {
    this.loadingProcess = true;
  }

  public hideSpinner(): void {
    this.loadingProcess = false;
  }
}
