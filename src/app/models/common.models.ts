export interface IFile {
  id: number;
  path: string;
  name: string;
  originalName: string;
  mimeType: string;
  size: number;
  addedAt: string;
}

export interface ISuccessResponse {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  info: string;
  serverStatus: number;
  warningStatus: number;
  changedRows?: number;
}
