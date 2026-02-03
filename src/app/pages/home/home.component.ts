import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { RacketService } from '../../services/racket.service';
import { CartStateService } from '../../services/cart-state.service';
import { Racket } from '../../models/racket.model';
import { FormsModule } from '@angular/forms';
import { ToastComponent } from '../../components/toast.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
[x: string]: any;

  rackets$!: Observable<Racket[]>;
  qty: { [key: number]: number } = {};

  toastMsg = '';
  showToast = false;
  toastTimeout: any;

  constructor(
    private racketService: RacketService,
    private cartState: CartStateService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.rackets$ = this.racketService.getAll();
    this.cartState.loadCart(); 
  }

  addToCart(racketId: number, qty: number, stock: number) {
    if (qty <= 0 || qty > stock) return;

    this.cartState.addItem(racketId, qty).subscribe({
      next: () => {
        this.showToastMsg('Agregado al carrito 🛒');
        this.qty[racketId] = 1;
      },
      error: () => {
        this.showToastMsg('Error al agregar');
      }
    });
  }

  showToastMsg(msg: string) {
    this.toastMsg = msg;
    this.showToast = true;
    this.cdr.markForCheck();
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.showToast = false;
      this.cdr.markForCheck();
    }, 3000);
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



