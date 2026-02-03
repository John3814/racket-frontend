import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Racket } from '../models/racket.model';

@Injectable({ providedIn: 'root' })
export class RacketService {

  private apiUrl = 'http://localhost:3000/api/rackets';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Racket[]> {
    return this.http.get<Racket[]>(this.apiUrl);
  }
}
