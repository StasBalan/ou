import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
  selector: 'ou-courses-admin',
  templateUrl: './courses-admin.component.html',
  styleUrls: ['../../styles/courses.styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesAdminComponent implements OnInit {
  constructor() {}

  public ngOnInit(): void {}
}
