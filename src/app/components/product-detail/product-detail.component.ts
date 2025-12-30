import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/core/cart.service';
import { Product } from 'src/app/core/product.model';
import { ProductService } from 'src/app/core/product.service';
import { WishlistService } from 'src/app/core/wishlist.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  isAdded: boolean = false;
  isWishlisted: boolean = false;

  constructor(
    private route: ActivatedRoute, private productService: ProductService, private cartService: CartService, private wishlistService: WishlistService
  ) { }

  ngOnInit(): void {
  const productId = this.route.snapshot.paramMap.get('id');

  if (productId) {
    const id = Number(productId);

    this.productService.getProductById(id).subscribe(data => {
      this.product = data;
      
      if (this.product) {
        this.isWishlisted = this.wishlistService.isItemWishlisted(this.product.id);
      }
    });
  }
  this.wishlistService.wishlist$.subscribe(ids => {
    if (this.product) {
      this.isWishlisted = ids.includes(this.product.id);
    }
  });
}

  toggleWishlist() {
  if (this.product) {
    this.wishlistService.toggleWishlist(this.product.id);
  }
}

  addToCart(product: Product | undefined) {
    if (product) {
      this.cartService.addToCart(product);
      this.isAdded = true;

      setTimeout(() => {
        this.isAdded = false;
      }, 1500);
    }
  }
}
