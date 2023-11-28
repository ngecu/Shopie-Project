
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'shoppingCart';

  getCart(): any[] {
    const cartString = localStorage.getItem(this.cartKey);

    if (cartString === null) {
      return [];
    }

    const cart = JSON.parse(cartString);
    return cart;
  }

  addToCart(product: any): void {
    const cart = this.getCart();
    cart.push(product);
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  removeFromCart(productId: any): void {
    const cart = this.getCart();
    const updatedCart = cart.filter((product) => product.productId !== productId);
    localStorage.setItem(this.cartKey, JSON.stringify(updatedCart));
  }
}
