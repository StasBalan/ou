import { Component, ChangeDetectionStrategy, ElementRef, OnInit, Input } from '@angular/core';

import { Positions, ColorClasses } from '../spinner.config';

@Component({
  selector: 'ou-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent implements OnInit {
  @Input()
  public blockWidth: number; // default: 100%

  @Input()
  public blockHeight: number; // default: 50px

  @Input()
  public diameter: number; // default: 50px

  @Input()
  public stretch = false;

  @Input()
  public position: Positions = Positions.Relative;

  @Input()
  public color: ColorClasses = ColorClasses.Primary1;

  constructor(
    private readonly elementRef: ElementRef,
  ) {}

  public ngOnInit(): void {
    this.applyParameters();
  }

  private applyParameters(): void {
    const hostElement: HTMLElement = this.elementRef.nativeElement as HTMLElement;
    const wrapperElement: HTMLDivElement = hostElement.firstChild as HTMLDivElement;

    if (!!this.blockWidth) {
      hostElement.style.width = `${this.blockWidth.toString()}px`;
    }

    if (!!this.blockHeight) {
      hostElement.style.height = `${this.blockHeight.toString()}px`;
    }

    if (!!this.diameter) {
      wrapperElement.style.width = `${this.diameter.toString()}px`;
    }

    if (this.stretch) {
      hostElement.style.flexGrow = '1';
    }

    if (this.position !== Positions.Relative) {
      hostElement.style.position = this.position;
    }
  }
}
