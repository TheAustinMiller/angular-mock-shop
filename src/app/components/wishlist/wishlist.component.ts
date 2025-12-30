import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Product } from 'src/app/core/product.model';
import { WishlistService } from 'src/app/core/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  items: Product[] = [];

  constructor(private wishlistService: WishlistService, private router: Router) { }

  ngOnInit() {
    this.loadWishlist();
  }

  getWishlistCount(): Observable<number> {
    return this.wishlistService.wishlist$.pipe(
      map(ids => ids.length)
    );
  }

  loadWishlist() {
    this.wishlistService.getWishlistItems().subscribe(products => {
      this.items = products;
    });
  }

  removeFromWishlist(productId: number) {
    this.wishlistService.toggleWishlist(productId);
    this.loadWishlist();
  }

  viewProductDetail(productId: number) {
    this.router.navigate(['/product', productId]);
  }
}
