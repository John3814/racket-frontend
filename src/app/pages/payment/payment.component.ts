import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartStateService } from '../../services/cart-state.service';
import { Observable } from 'rxjs';
import { Cart } from '../../models/cart.model';
import { Router } from '@angular/router';

type PaymentMethod = 'CARD' | 'TRANSFER' | 'PSE';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  selectedMethod: PaymentMethod | null = null;
  cart$!: Observable<Cart | null>;
  purchaseDone = false;
  redirecting = false;

  constructor(
    private cartState: CartStateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cart$ = this.cartState.cart$;
    this.cartState.loadCart();
  }

  select(method: PaymentMethod) {
    this.selectedMethod = method;
  }

  confirm() {
    if (!this.selectedMethod) return;

    this.cartState.checkout();

    this.purchaseDone = true;
    this.redirecting = true;

    setTimeout(() => {
      this.router.navigate(['/']);
    }, 3000);
  }


  total(cart: Cart) {
    return cart.items.reduce(
      (acc, i) => acc + (i.racket.price * i.quantity), 0
    );
  }
}

