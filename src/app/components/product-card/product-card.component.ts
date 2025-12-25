import { Component, Input } from '@angular/core';
import { Product } from 'src/app/core/product.model';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;
  isAdded: boolean = false;

  constructor(private router: Router, private cartService: CartService) { }

  viewProductDetail() {
    this.router.navigate(['/product', this.product.id]);
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
