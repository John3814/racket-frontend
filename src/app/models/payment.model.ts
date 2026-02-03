export type PaymentMethod = 'CARD' | 'TRANSFER' | 'PSE';

export interface Payment {
  method: PaymentMethod;
}
