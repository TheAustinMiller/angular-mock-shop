import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/core/cart-item.model';
import { CartService } from 'src/app/core/cart.service';
import { Order } from 'src/app/core/order.model';
import { Product } from 'src/app/core/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  @ViewChild('shippingSelect') shippingSelect!: ElementRef;
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
    this.shippingCost = Number(event.target.value);
  }

  checkout() {
    const orderNum: number = Math.floor(Math.random() * 1000000);
    this.cartService.setOrderNumber(orderNum);
    const newOrder: Order = {
      orderNumber: orderNum,
      date: new Date().toLocaleDateString(),
      items: this.items,
      subtotal: this.calculateSubtotal(),
      tax: this.calculateTax(),
      shipping: this.shippingCost,
      total: this.calculateFinalTotal()
    };
    this.cartService.saveOrder(newOrder);
    const finalShipping = Number(this.shippingSelect.nativeElement.value);
    this.cartService.setShippingCost(finalShipping);
    this.router.navigate(['/checkout']);
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
