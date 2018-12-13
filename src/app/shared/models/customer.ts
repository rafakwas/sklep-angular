export class Customer {
  id: string;
  email: string;
  password: string;
  username: string;
  address: string;
  role: string;
  constructor(id: string, email: string, password: string, username: string, address: string) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.username = username;
    this.address = address;
    this.role = 'CUSTOMER';
  }
}
