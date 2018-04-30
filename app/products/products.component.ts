import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  myProducts = new Array<Product>();
  page:number;

  constructor(private productService: ProductService ) { 
    this.productService=productService;
  }

  
  ngOnInit() {
    this.productService.getProducts().subscribe(products=>this.myProducts=products);
  }

}
