import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartStateService } from '../../services/cart-state.service';
import { Observable } from 'rxjs';
import { Cart } from '../../models/cart.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  cart$!: Observable<Cart | null>;

  constructor(
    private cartState: CartStateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cart$ = this.cartState.cart$;   
    this.cartState.loadCart();
  }

  remove(racketId: number) {
    this.cartState.remove(racketId);
  }

  continue() {
    this.router.navigate(['/payment']);
  }

  total() {
    return this.cartState.getTotal();
  }
}



