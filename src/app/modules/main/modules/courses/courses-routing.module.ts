import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseExistsGuard } from './guards/course-exists.guard';

import { CoursesOutletComponent } from './components/courses-outlet/courses-outlet.component';
import { CoursePageOutletComponent } from './components/course-page-outlet/course-page-outlet.component';

const childrenRoutes: Routes = [
  {
    path: '',
    component: CoursesOutletComponent,
  },
  {
    path: ':courseId',
    component: CoursePageOutletComponent,
    canActivate: [CourseExistsGuard],
  },
];

const routes: Routes = [
  {
    path: '',
    children: childrenRoutes,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
