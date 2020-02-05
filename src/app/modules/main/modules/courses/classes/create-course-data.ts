import { ICreateCourseData } from '../models/courses.model';

export class CreateCourseDataObject implements ICreateCourseData {
  public courseName: string;
  public courseGroupName: string;
  public courseDescription: string;
  public courseCode: string;

  constructor({
     courseName,
     courseGroupName,
     courseDescription,
     courseCode,
  }) {
    this.courseName = courseName;
    this.courseGroupName = courseGroupName;
    this.courseDescription = courseDescription;
    this.courseCode = courseCode;
  }
}
