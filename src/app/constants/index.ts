import { HttpHeaders } from '@angular/common/http';

export const API_URL = 'http://f9bc8738.ngrok.io';

export enum LocalStorageKeys {
  User = 'User',
  Token = 'Token',
}

export const API = {
  loginUser: `${API_URL}/login`,
  registerUser: `${API_URL}/users`,
  getAllUses: `${API_URL}/users`,
  getCurrentUser: `${API_URL}/users/current`,
  modifyUser: (userId: number) => `${API_URL}/users/${userId}`,
  deleteUser: (userId: number) => `${API_URL}/users/${userId}`,

  getCourses: `${API_URL}/courses`,
  getFullCourseData: (courseId: number) => `${API_URL}/courses/${courseId}`,
  joinCourse: `${API_URL}/courses/join`,
  createCourse: `${API_URL}/courses`,

  getChats: `${API_URL}/chats`,
  getFullChatData: (chatId: string) => `${API_URL}/chats/${chatId}`,

  uploadAvatar: `${API_URL}/files/avatar`,
  getFileData: (fileName: string) => `${API_URL}/files/${fileName}`,
  getAvatarData: (avatarName: string) => `${API_URL}/files/${avatarName}`,
};

export const DEFAULT_HEADERS: HttpHeaders = new HttpHeaders({
  'Content-type': 'application/json',
});

export const AUTH_HEADERS: () => HttpHeaders = () => new HttpHeaders({
  Authorization: `Bearer ${JSON.parse(localStorage.getItem(LocalStorageKeys.Token))}`,
});
