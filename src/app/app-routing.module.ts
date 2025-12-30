import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { OrdersComponent } from './components/orders/orders.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },

  { path: 'product/:id', component: ProductDetailComponent }, 

  { path: 'cart', component: CartComponent }, 

  { path: 'checkout', component: CheckoutComponent }, 

  { path: 'wishlist', component: WishlistComponent }, 

  { path: 'orders', component: OrdersComponent }, 
  
  { path: '**', redirectTo: '' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }