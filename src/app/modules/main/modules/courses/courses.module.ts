import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { DialogModule } from '@shared/dialog/dialog.module';
import { SpinnerModule } from '@shared/spinner/spinner.module';
import { ImageModule } from '@shared/image/image.module';
import { CustomInputModule } from '@shared/custom-input/custom-input.module';
import { CoursesRoutingModule } from './courses-routing.module';

import { CoursesHttpService } from './services/courses-http.service';
import { BackdropService } from '@services/backdrop.service';
import { CourseExistsGuard } from './guards/course-exists.guard';

import { CoursesOutletComponent } from './components/courses-outlet/courses-outlet.component';
import { CoursesAdminComponent } from './components/courses-admin/courses-admin.component';
import { CoursesStudentComponent } from './components/courses-student/courses-student.component';
import { CoursesTeacherComponent } from './components/courses-teacher/courses-teacher.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CoursePageOutletComponent } from './components/course-page-outlet/course-page-outlet.component';
import { CoursePageStudentComponent } from './components/course-page-student/course-page-student.component';
import { CoursePageHeaderComponent } from './components/course-page-header/course-page-header.component';
import { CoursePageItemsListComponent } from './components/course-page-items-list/course-page-items-list.component';
import { CoursePageRightBarComponent } from './components/course-page-right-bar/course-page-right-bar.component';
import { JoinCourseDialogComponent } from './components/join-course-dialog/join-course-dialog.component';
import { CreateCourseDialogComponent } from './components/create-course-dialog/create-course-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    DialogModule.forRoot(),
    SpinnerModule,
    ImageModule,
    CustomInputModule,
    CoursesRoutingModule,
  ],
  declarations: [
    CoursesOutletComponent,
    CoursesAdminComponent,
    CoursesStudentComponent,
    CoursesTeacherComponent,
    CourseCardComponent,
    CourseListComponent,
    CoursePageOutletComponent,
    CoursePageStudentComponent,
    CoursePageHeaderComponent,
    CoursePageItemsListComponent,
    CoursePageRightBarComponent,
    JoinCourseDialogComponent,
    CreateCourseDialogComponent,
  ],
  entryComponents: [
    JoinCourseDialogComponent,
    CreateCourseDialogComponent,
  ],
  providers: [
    CoursesHttpService,
    BackdropService,
    CourseExistsGuard,
  ],
})
export class CoursesModule {}
