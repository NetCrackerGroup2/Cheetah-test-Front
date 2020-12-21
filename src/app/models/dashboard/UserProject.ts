export class UserProject {
  id: number;
  title: string;
  userStatus: string;

  constructor(id: number, title: string, userStatus: string) {
    this.id = id;
    this.title = title;
    this.userStatus = userStatus;
  }
}
