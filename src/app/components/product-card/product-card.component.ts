import { Component, Input } from '@angular/core';
import { Product } from 'src/app/core/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(private router: Router) { }

  viewProductDetail() {
    this.router.navigate(['/product', this.product.id]);
  }

  addToCart(event: Event) {
    event.stopPropagation();

    // this.cartService.addItem(this.product);
  }
}
