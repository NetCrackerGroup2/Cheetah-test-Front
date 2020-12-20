export class RecentUser {
  imgUrl: string;
  fullName: string;
  userRole: string;
  date: string;

  constructor(imgUrl: string, fullName: string, userRole: string, date: string) {
    this.imgUrl = imgUrl;
    this.fullName = fullName;
    this.userRole = userRole;
    this.date = date;
  }
}
