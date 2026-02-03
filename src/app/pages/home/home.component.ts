import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { RacketService } from '../../services/racket.service';
import { CartStateService } from '../../services/cart-state.service';
import { Racket } from '../../models/racket.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  rackets$!: Observable<Racket[]>;

  constructor(
    private racketService: RacketService,
    private cartState: CartStateService
  ) {}

  ngOnInit() {
    this.rackets$ = this.racketService.getAll();
    this.cartState.loadCart(); // 👈 aquí, no en propiedad
  }

  addToCart(racket: Racket) {
    this.cartState.add(racket.id);
  }
}



