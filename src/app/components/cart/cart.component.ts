import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/core/cart.service';
import { Product } from 'src/app/core/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  count = 0;
  cartCount$: Observable<number> | undefined;
  items: Product[] = [];
  product: Product | undefined;

  constructor(private router: Router, private cartService: CartService) { this.cartCount$ = this.cartService.cartCount$; }

  ngOnInit() {
    this.items = this.cartService.getItems();

    this.cartService.cartCount$.subscribe(val => {
      this.count = val;
    });
  }

  removeFromCart(productId: number) {
    this.cartService.removeItem(productId);
    this.items = this.cartService.getItems();
  }

  viewProductDetail(productId: number) {
    this.router.navigate(['/product', productId]);
  }

  calculateTotal() {
    return this.items.reduce((acc, item) => acc + item.price, 0);
  }
}
