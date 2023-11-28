import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  private baseUrl = 'http://localhost:5000/product'; 

  async createProduct(productData: any) {
    let token = localStorage.getItem('token') as string

    const url = `${this.baseUrl}/`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token':token
            },
      body: JSON.stringify(productData),
    });

    const data = await response.json();
    return data;
  }

  async getAllProducts(): Promise<any> {
    const url = `${this.baseUrl}`;
    const response = await fetch(url, {
      method: 'GET'
    });

    const data = await response.json();
    return data;
  }

  async getProductById(productId: string): Promise<any> {
    const url = `${this.baseUrl}/${productId}`;
    const response = await fetch(url, {
      method: 'GET'
    });

    const data = await response.json();
    console.log(data);
    
    return data;
  }

  async updateProduct(productId: string, productData: any): Promise<any> {
    let token = localStorage.getItem('token') as string

    const url = `${this.baseUrl}/${productId}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'token':token
      },
      body: JSON.stringify(productData),
    });

    const data = await response.json();
    return data;
  }

  async deleteProduct(productId: string): Promise<any> {
    let token = localStorage.getItem('token') as string
    const url = `${this.baseUrl}/${productId}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'token':token
            },
    });

    const data = await response.json();
    return data;
  }

    async categoryProducts(categoryId: string) {
    let token = localStorage.getItem('token') as string
    const url = `${this.baseUrl}/category/${categoryId}`;
    const response = await fetch(url, {
      method: 'GET',

    });

    const data = await response.json();
    return data;
  }


}
