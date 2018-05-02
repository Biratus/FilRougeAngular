import { Component, OnInit } from '@angular/core';
import {Product} from '../product';
import {ProductService} from '../product.service';
import {DataTableModule} from 'primeng/datatable';
import {TableModule} from 'primeng/table';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  myProducts: Product[];
  cols: any[];
  page: number;

  constructor(private productService: ProductService) {
    this.productService=productService;
  }

  ngOnInit() {
    
    this.productService.getProducts().subscribe(products=>this.myProducts=products);

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Name' },
      { field: 'type', header: 'Type' },
      { field: 'price', header: 'Price' },
      { field: 'category', header: 'Category' },
      { field: 'qty', header: 'Quantity' },
      { field: 'src', header: 'Source' }
    ];
  }

}
