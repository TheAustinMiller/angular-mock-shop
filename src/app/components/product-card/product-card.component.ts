import { Component, Input } from '@angular/core';
import { Product } from 'src/app/core/product.model';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/cart.service';
import { WishlistService } from 'src/app/core/wishlist.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;
  isAdded: boolean = false;
  isWishlisted: boolean = false;

  constructor(private router: Router, private cartService: CartService, private wishlistService: WishlistService) { }

  viewProductDetail() {
    this.router.navigate(['/product', this.product.id]);
  }

  toggleWishlist(event: Event, product: any) {
    event.stopPropagation();
    this.isWishlisted = !this.isWishlisted;
    this.wishlistService.addToWishlist(product);
}

  addToCart(event: Event, product: Product) {
    event.stopPropagation();
    this.cartService.addToCart(product);
    this.isAdded = true;
    setTimeout(() => {
      this.isAdded = false;
    }, 1500);
  }
}
