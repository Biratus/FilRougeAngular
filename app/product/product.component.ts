import { Component, OnInit } from '@angular/core';
import {Product} from '.././product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  myProducts= new Array<Product>();

  constructor() { }

  ngOnInit() {
    
  }

}
