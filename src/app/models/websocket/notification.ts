export enum NotificationStatus {
  COMPLETE,
  FAILED,
  IN_PROCESS
}

export enum ReadStatus {
  READ,
  UNREAD
}

export interface Notification {
  id: number;
  title: string;
  description: string;
  notificationStatus: NotificationStatus;
  date: Date;
  testCaseId: number;
  projectId: number;
  readStatus: ReadStatus;
}
