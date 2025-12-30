import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/core/cart.service';
import { WishlistService } from 'src/app/core/wishlist.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  count = 0;
  cartCount$: Observable<number> | undefined;

  constructor(private router: Router, private cartService: CartService, private wishlistService: WishlistService) { this.cartCount$ = this.cartService.cartCount$; }

  NgOnInit() {
    this.cartService.cartCount$.subscribe(newCount => {
      this.count = newCount;
    })
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  goToWishlist() {
    this.router.navigate(['/wishlist']);
  }

  returnHome() {
    this.router.navigate(['/']);
  }
}
