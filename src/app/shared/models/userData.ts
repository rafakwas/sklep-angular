export class UserData {
  id: string;
  email: string;
  username: string;
  role: string;
  constructor(id?: string, email?: string, username?: string, role?: string) {
    this.id = id;
    this.email = email;
    this.username = username;
      this.role = role;
  }
}

