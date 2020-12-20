export class UserProject {
  projectId: number;
  projectTitle: string;
  userStatus: string;

  constructor(projectId: number, projectTitle: string, userStatus: string) {
    this.projectId = projectId;
    this.projectTitle = projectTitle;
    this.userStatus = userStatus;
  }
}
