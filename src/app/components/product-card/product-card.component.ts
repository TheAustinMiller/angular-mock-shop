import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/core/product.model';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/cart.service';
import { WishlistService } from 'src/app/core/wishlist.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  isAdded: boolean = false;
  isWishlisted: boolean = false;

  constructor(
    private router: Router, 
    private cartService: CartService, 
    private wishlistService: WishlistService
  ) { }

  ngOnInit(): void {
    this.isWishlisted = this.wishlistService.isItemWishlisted(this.product.id);
    this.wishlistService.wishlist$.subscribe(ids => {
      this.isWishlisted = ids.includes(this.product.id);
    });
  }

  viewProductDetail() {
    this.router.navigate(['/product', this.product.id]);
  }

  toggleWishlist(event: Event, product: Product) {
    event.stopPropagation();
    this.wishlistService.toggleWishlist(product.id);
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