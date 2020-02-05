import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ou-inner-page',
  templateUrl: './inner-page.component.html',
  styleUrls: ['./inner-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InnerPageComponent {}
