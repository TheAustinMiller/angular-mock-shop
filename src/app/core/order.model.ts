import { CartItem } from "./cart-item.model";

export interface Order {
  orderNumber: number;
  date: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}