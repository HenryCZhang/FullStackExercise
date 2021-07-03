import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products=[
    {id:1, type: "book"},
    {id:2, type: "pen"},
    {id:3, type: "folder"},
    {id:4, type: "stapler"},
  ]
  constructor() { }

  getProducts(){
    return this.products;
  }
}
