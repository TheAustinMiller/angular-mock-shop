import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private wishlistIds: number[] = [];
  private wishlistSubject = new BehaviorSubject<number[]>([]);
  
  wishlist$ = this.wishlistSubject.asObservable();
  wishlistCount$ = this.wishlistSubject.pipe(map(ids => ids.length));

  constructor(private productService: ProductService) {}

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

  getWishlistItems() {
    return this.productService.getProducts().pipe(
      map(allProducts => allProducts.filter(p => this.wishlistIds.includes(p.id)))
    );
  }
}