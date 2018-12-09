export class Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  url : string;
  constructor(id: number, name: string, price: number, category: string, description: string, url: string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.description = description;
    this.url = url;
  }
}
