import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  model: Product = new Product(0, "", "", 0, "CLIMBING", 0, "");
  submitted = false;
  myProducts: Product[];
  page: number = 1;
  resultByPage: number = 9;

  constructor(private productService: ProductService) {
    this.productService = productService;
  }


  ngOnInit() {
    this.productService.getProducts().subscribe(myProducts => this.myProducts = myProducts);
  }

  onSubmit() {
    this.submitted = true;
    console.log("submitted done");
    this.productService.search(this.model, this.model, this.page, this.resultByPage).subscribe();
    console.log(this.model);
  }
}
