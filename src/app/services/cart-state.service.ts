import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../models/cart.model';
import { CartApiService } from './cart-api.service';

@Injectable({ providedIn: 'root' })
export class CartStateService {

  private cartSubject = new BehaviorSubject<Cart | null>(null);
  cart$ = this.cartSubject.asObservable();

  constructor(private cartApi: CartApiService) {}

  loadCart() {
    this.cartApi.getCart().subscribe(cart => {
      this.cartSubject.next(cart);
    });
  }

  add(racketId: number) {
    this.cartApi.addToCart(racketId).subscribe(() => {
      this.loadCart(); // 🔁 sincroniza estado con backend
    });
  }

  remove(racketId: number) {
    this.cartApi.removeFromCart(racketId).subscribe(() => {
      this.loadCart();
    });
  }

  checkout() {
    this.cartApi.checkout().subscribe(() => {
      this.loadCart();
    });
  }

  getTotal(): number {
    const cart = this.cartSubject.value;
    if (!cart) return 0;

    return cart.items.reduce(
      (acc, item) => acc + (item.racket.price * item.quantity), 0
    );
  }
}
