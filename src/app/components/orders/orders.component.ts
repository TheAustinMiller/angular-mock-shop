import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/cart.service';
import { Order } from 'src/app/core/order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orderHistory: Order[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.orderHistory = this.cartService.getHistory();
  }
}
