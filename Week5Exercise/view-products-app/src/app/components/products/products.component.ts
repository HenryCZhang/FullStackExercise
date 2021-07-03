import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products!: any[];
  
  constructor(private service: ProductsService) {
    this.products = service.getProducts();
   }

  ngOnInit(): void {
  }

}
