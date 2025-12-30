import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from './cart-item.model';
import { Order } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private STORAGE_KEY = 'my_shop_orders';
  private cartItems: CartItem[] = [];
  private cartCount = new BehaviorSubject<number>(0);
  private shippingCost = 1.99;
  private orderNumber = 69;

  cartCount$ = this.cartCount.asObservable();

  getOrderNumber(): number {
    return this.orderNumber;
  }

  setOrderNumber(cost: number) {
    this.orderNumber = cost;
  }

  getShippingCost(): number {
    return this.shippingCost;
  }

  setShippingCost(cost: number) {
    this.shippingCost = cost;
  }

  addToCart(product: Product) {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }

    this.updateCartCount();
  }

  updateQuantity(productId: number, change: number) {
    const item = this.cartItems.find(i => i.product.id === productId);
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        this.removeItemCompletely(productId);
      }
    }
    this.updateCartCount();
  }

  removeItemCompletely(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.updateCartCount();
  }

  private updateCartCount() {
    const total = this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
    this.cartCount.next(total);
  }

  removeItem(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.updateCartCount();
  }

  saveOrder(order: Order) {
    const existingOrders = this.getHistory();
    existingOrders.unshift(order);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingOrders));
  }

  getHistory(): Order[] {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  }

  getItems(): CartItem[] {
    return this.cartItems;
  }
}
