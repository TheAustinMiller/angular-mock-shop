import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/core/cart-item.model';
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
  items: CartItem[] = [];
  product: Product | undefined;
  shippingCost: number = 1.99;

  constructor(private router: Router, private cartService: CartService) { this.cartCount$ = this.cartService.cartCount$; }

  ngOnInit() {
    this.items = this.cartService.getItems();
    this.cartService.cartCount$.subscribe(c => this.count = c);
  }

  increaseQuantity(productId: number) {
    this.cartService.updateQuantity(productId, 1);
  }

  decreaseQuantity(productId: number) {
    if (this.items.find(i => i.product.id === productId)?.quantity === 1) {
      this.removeFromCart(productId);
      return;
    }
    this.cartService.updateQuantity(productId, -1);
  }

  removeFromCart(productId: number) {
    this.cartService.removeItemCompletely(productId);
    this.items = this.cartService.getItems();
}

  viewProductDetail(productId: number) {
    this.router.navigate(['/product', productId]);
  }

  onShippingChange(event: any) {
    const selectedValue = event.target.value;
    this.shippingCost = Number(selectedValue);
    this.cartService.setShippingCost(this.shippingCost);
  }

  calculateTax() {
    return (this.calculateSubtotal() * 0.055);
  }

  calculateSubtotal() {
    return this.items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
}

  calculateFinalTotal() {
    return this.calculateSubtotal() + this.calculateTax() + this.shippingCost;
  }
}
