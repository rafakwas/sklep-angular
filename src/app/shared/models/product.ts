export class  Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  productAdded: number;
  quantity: number;
  bargain? : number;
  till? : number;
  constructor(id?: string, name?: string, imageUrl?: string, price?: number, category?: string, description?: string, quantity?: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.description = description;
    this.imageUrl = imageUrl;
    this.quantity = quantity;
  }
}
