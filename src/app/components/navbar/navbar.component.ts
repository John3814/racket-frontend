import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartStateService } from '../../services/cart-state.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  cartCount = 0;

  constructor(private cartState: CartStateService) {}

  ngOnInit() {
    this.cartState.cart$.subscribe(cart => {
      if (cart) {
        this.cartCount = cart.items.reduce((acc, i) => acc + i.quantity, 0);
      }
    });
  }
}
