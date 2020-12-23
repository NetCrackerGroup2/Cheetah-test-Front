export enum NotificationStatus {
  COMPLETE = 'COMPLETE',
  FAILED = 'FAILED',
  INPROCESS = 'INPROCESS'
}

export enum ReadStatus {
  READ = 'READ',
  UNREAD = 'UNREAD'
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
  htcId: number;
}
