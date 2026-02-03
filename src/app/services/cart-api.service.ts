import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../models/cart.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartApiService {

  private baseUrl = 'http://localhost:3000/api/cart';

  constructor(private http: HttpClient) {}

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(this.baseUrl);
  }

  addToCart(racketId: number, quantity: number = 1) {
    return this.http.post(`${this.baseUrl}/add`, {
      racketId,
      quantity
    });
  }

  removeFromCart(racketId: number) {
    return this.http.delete(`${this.baseUrl}/${racketId}`);
  }

  checkout() {
    return this.http.post(`${this.baseUrl}/checkout`, {});
  }
}
