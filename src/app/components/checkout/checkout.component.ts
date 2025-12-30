import { Component } from '@angular/core';
import { CartService } from 'src/app/core/cart.service';
import { Product } from 'src/app/core/product.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  items: Product[] = [];
  orderNumber: number = Math.floor(Math.random() * 100000);

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.items = this.cartService.getItems();
  }

  getShippingCost(): number {
    return this.cartService.getShippingCost();
  }

  calculateSubtotal() {
    return this.items.reduce((acc, item) => acc + item.price, 0);
  }

  calculateTax() {
    return (this.calculateSubtotal() * 0.055);
  }

  calculateFinalTotal() {
    return this.calculateSubtotal() + this.calculateTax() + this.getShippingCost();
  }
}