import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private wishlistIds: number[] = [];
  private wishlistSubject = new BehaviorSubject<number[]>([]);

  wishlist$ = this.wishlistSubject.asObservable();

  toggleWishlist(productId: number) {
    const index = this.wishlistIds.indexOf(productId);
    if (index > -1) {
      this.wishlistIds.splice(index, 1);
    } else {
      this.wishlistIds.push(productId);
    }
    this.wishlistSubject.next([...this.wishlistIds]);
  }

  isItemWishlisted(productId: number): boolean {
    return this.wishlistIds.includes(productId);
  }
}