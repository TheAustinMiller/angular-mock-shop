import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Product[] = [];
  private cartCount = new BehaviorSubject<number>(0);

  cartCount$ = this.cartCount.asObservable();

  addToCart(product: Product) {
    this.cartItems.push(product);
    this.cartCount.next(this.cartItems.length);
    console.log('Cart:', this.cartItems);
  }

  getItems() {
    return this.cartItems;
  }
}
