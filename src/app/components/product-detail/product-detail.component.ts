import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/core/cart.service';
import { Product } from 'src/app/core/product.model';
import { ProductService } from 'src/app/core/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  product: Product | undefined;
  isAdded: boolean = false;

  constructor(
    private route: ActivatedRoute, private productService: ProductService, private cartService: CartService
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');

    if (productId) {
      const id = Number(productId);

      this.productService.getProductById(id).subscribe(data => {
        this.product = data;
      });
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
