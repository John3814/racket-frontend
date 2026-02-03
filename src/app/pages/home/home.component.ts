import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { RacketService } from '../../services/racket.service';
import { CartStateService } from '../../services/cart-state.service';
import { Racket } from '../../models/racket.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
[x: string]: any;

  rackets$!: Observable<Racket[]>;

  qty: { [key: number]: number } = {};


  constructor(
    private racketService: RacketService,
    private cartState: CartStateService
  ) {}

  ngOnInit() {
    this.rackets$ = this.racketService.getAll();
    this.cartState.loadCart(); 
  }

  addToCart(racketId: number, qty: number, stock: number) {
    if (qty <= 0 || qty > stock) return;

    this.cartState.addItem(racketId, qty).subscribe({
      next: () => {
        alert('Agregado al carrito 🛒');
      },
      error: () => {
        alert('Error al agregar');
      }
    });
  }

  inc(r: Racket) {
    const current = this.qty[r.id] || 1;
    if (current < r.stock) this.qty[r.id] = current + 1;
  }

  dec(r: Racket) {
    const current = this.qty[r.id] || 1;
    if (current > 1) this.qty[r.id] = current - 1;
  }



}



