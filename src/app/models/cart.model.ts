import { CartItem } from "./cart-item.model";

export interface Cart {
  id: number
  status: string
  items: CartItem[]
}
