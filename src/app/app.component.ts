import { Component } from '@angular/core';
import { Product } from './core/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MockShop';
  testProduct: Product = {
    id: 1,
    title: 'Test Shoes',
    price: 45.99,
    description: 'A very cool pair of mock shoes.',
    category: 'footwear',
    image: 'https://static.vecteezy.com/system/resources/previews/043/344/974/non_2x/high-performance-basketball-shoes-on-transparent-background-png.png',
  };
}
