import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/cart.service';
import { CartItem } from 'src/app/core/cart-item.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  items: CartItem[] = [];
  orderNumber: number = Math.floor(Math.random() * 1000000);
  shippingType: string = 'Standard Shipping';

  constructor(private cartService: CartService) {
    const cost = this.getShippingCost();
    if (cost === 4.99) {
      this.shippingType = 'Expedited Shipping';
    } else if (cost === 9.99) {
      this.shippingType = 'Express Shipping';
    } else {
      this.shippingType = 'Standard Shipping';
    }
  }

  ngOnInit() {
    this.items = this.cartService.getItems();
  }

  getShippingCost(): number {
    return this.cartService.getShippingCost();
  }

  calculateSubtotal() {
    return this.items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  }

  calculateTax() {
    return (this.calculateSubtotal() * 0.055);
  }

  calculateFinalTotal() {
    return this.calculateSubtotal() + this.calculateTax() + this.getShippingCost();
  }
}