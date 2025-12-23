import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/product.model';
import { ProductService } from 'src/app/core/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  // Inside product-detail.component.ts
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,       // The "URL Listener"
    private productService: ProductService // The "Data Fetcher"
  ) { }

  ngOnInit(): void {
    // 1. Grab the ID from the URL snapshot
    const productId = this.route.snapshot.paramMap.get('id');

    // 2. Convert it to a number (API usually expects numbers)
    if (productId) {
      const id = Number(productId);

      // 3. Ask the service for the data
      this.productService.getProductById(id).subscribe(data => {
        this.product = data; // Now you have the full product object!
      });
    }
  }
}
