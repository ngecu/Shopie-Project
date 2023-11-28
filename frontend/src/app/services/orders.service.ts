import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private baseUrl = 'http://localhost:5000/order'; 

  constructor() { }

  async addOrderItems(orderData: any) {
    const url = `${this.baseUrl}/`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();
    return data;
  }

  async getOrders() {
    const url = `${this.baseUrl}/`;
    let token = localStorage.getItem('token') as string
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'token':token
      },
    });

    const data = await response.json();
    return data;
  }

  async getMyOrders(){
    let token = localStorage.getItem('token') as string

    const url = `${this.baseUrl}/myorders`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'token':token
            },
    });

    const data = await response.json();
    return data;
  }

  async getOrderById(orderId: string) {
    let token = localStorage.getItem('token') as string

    const url = `${this.baseUrl}/${orderId}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'token':token
            },
    });

    const data = await response.json();
    return data;
  }

  async updateOrderToPaid(orderId: string) {
    let token = localStorage.getItem('token') as string

    const url = `${this.baseUrl}/orders/${orderId}/pay`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'token':token
            },
    });

    const data = await response.json();
    return data;
  }

  async updateOrderToDelivered(orderId: string) {
    let token = localStorage.getItem('token') as string

    const url = `${this.baseUrl}/${orderId}/deliver`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'token':token
            },
    });

    const data = await response.json();
    return data;
  }
  
}
