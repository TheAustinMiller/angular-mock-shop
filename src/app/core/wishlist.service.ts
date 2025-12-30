import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistItems: Product[] = [];
  private wishlistCount = new BehaviorSubject<number>(0);

  wishlistCount$ = this.wishlistCount.asObservable();

  addToWishlist(product: Product) {
    this.wishlistItems.push(product);
    this.wishlistCount.next(this.wishlistItems.length);
  }

  removeItem(productId: number) {
    this.wishlistItems = this.wishlistItems.filter(item => item.id !== productId);
    this.wishlistCount.next(this.wishlistItems.length);
  }
}
