import { Component, ChangeDetectionStrategy, Input, OnInit, ElementRef } from '@angular/core';

const STATIC_PATH = '../../../../assets/images/';

@Component({
  selector: 'ou-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageComponent implements OnInit {
  @Input()
  public set src(value: string) {
    if (value.includes('../')) {
      this.imageSrc = value;

      return;
    }

    this.imageSrc = `${STATIC_PATH}${value}`;
  }

  @Input()
  public alt = '';

  @Input()
  public width: number; // default: 50px

  @Input()
  public height: number; // default: 50px

  public imageSrc: string;
  public isImageLoaded = false;

  constructor(
    private readonly elementRef: ElementRef,
  ) {}

  public ngOnInit(): void {
    this.checkImageSrc();
    this.applyParameters();
  }

  public onImageLoad(): void {
    this.isImageLoaded = true;
  }

  private checkImageSrc(): void {
    if (!this.imageSrc) {
      throw new Error(`<ou-image> can't be used without [src] attribute!`);
    }
  }

  private applyParameters(): void {
    const hostElement: HTMLElement = this.elementRef.nativeElement as HTMLElement;
    const imageElement: HTMLImageElement = hostElement.querySelector('img');

    if (!!this.width) {
      const widthStr = `${this.width.toString()}px`;

      hostElement.style.width = widthStr;
      imageElement.style.width = widthStr;
    }

    if (!!this.height) {
      hostElement.style.height = `${this.height.toString()}px`;
    }
  }
}
