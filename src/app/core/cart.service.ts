import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Product[] = [];
  private cartCount = new BehaviorSubject<number>(0);
  private shippingCost = 1.99;

  cartCount$ = this.cartCount.asObservable();

  getShippingCost() {
    return this.shippingCost;
  }

  setShippingCost(shipping: number) {
    this.shippingCost = shipping;
  }

  addToCart(product: Product) {
    this.cartItems.push(product);
    this.cartCount.next(this.cartItems.length);
  }

  removeItem(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.cartCount.next(this.cartItems.length);
  }

  getItems() {
    return this.cartItems;
  }
}
