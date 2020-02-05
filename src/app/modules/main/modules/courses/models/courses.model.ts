import { IUser } from '@models/user.models';

export enum CourseModes {
  Private = 0,
  Public = 1,
}

export interface ICourse {
  courseId: number;
  chatId: number;
  courseName: string;
  courseDescription: string;
  courseGroupName: string;
  courseCode: string;
  courseOwnerId: number;
  courseOwnerFullName: string;
  courseCreatedAt: string;
  pictureName: string;
  colorPaletteName: string;
  courseMode: CourseModes;
}

export interface IFullCourseData extends ICourse {
  courseItems: ICourseItem[];
  users: IUser[];
}

export interface ICourseItem {
  courseId: number;
  courseItemId: number;
  courseItemTitle: string;
  courseItemTextContent: string;
  creator: IUser;
  addedAt: string;
}

export interface ICreateCourseData {
  courseName: string;
  courseGroupName: string;
  courseDescription: string;
  courseCode: string;
}

export interface ICourseCode {
  courseCode: string;
}

export interface IJoinedCourseData {
  joinedCourseId: number;
}
