import { Component } from '@angular/core';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {

 cartItems: Product[] = [];
  subtotal : Number = 0
  total_items : Number  = 0
  ngOnInit(): void {
    // Retrieve cart items from localStorage
    const storedCartItems = localStorage.getItem('cartItems');
    this.cartItems = storedCartItems ? JSON.parse(storedCartItems) : [];

 
   this.subtotal =  Number(this.cartItems
      .reduce((acc, item) => acc + item?.qty * item.price, 0)
      .toFixed(2))


    this.total_items = Number(this.cartItems.reduce((acc, item) => acc + item.qty, 0))
  }

  

}
