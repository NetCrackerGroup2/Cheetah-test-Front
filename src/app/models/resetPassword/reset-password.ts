export class ResetPassword {
  token: string;
  password: string;

  constructor(resetToken: string, password: string) {
    this.token = resetToken;
    this.password = password;
  }
}
