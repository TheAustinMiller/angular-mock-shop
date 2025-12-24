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
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
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
}
