export class Customer {
  id: string;
  email: string;
  password: string;
  username: string;
  role: string;
  constructor(id: string, email: string, password: string, username: string) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.username = username;
    this.role = 'CUSTOMER';
  }
}
