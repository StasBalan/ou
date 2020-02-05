import { ICourseCode } from './courses.model';

export class CourseCodeObject implements ICourseCode {
  constructor(
    public courseCode: string,
  ) {}
}
