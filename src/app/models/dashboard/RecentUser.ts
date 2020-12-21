export class RecentUser {
  name: string;
  role: string;
  time: string;
  photoUrl: string;

  constructor(name: string, role: string, time: string, photoUrl: string) {
    this.name = name;
    this.role = role;
    this.time = time;
    this.photoUrl = photoUrl;
  }
}
