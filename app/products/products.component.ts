import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs';
import { DataGridModule } from 'primeng/datagrid';
import { PanelModule } from 'primeng/panel';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  model: Product = new Product(0, "", "", 0, "", 0, "", false);
  myProducts: Product[];
  name:string="";
  category:string="";
  page: number = 1;
  resultByPage: number = 9;
  nameProduct = "";

  constructor(private productService: ProductService) {
    this.productService = productService;
  }


  ngOnInit() {
    this.productService.getProducts().subscribe(myProducts => this.myProducts = myProducts);

  }

  input(nameProduct: string) {
    if (nameProduct) {
      this.nameProduct = nameProduct;
    }
    console.log("Test submitted : " + this.nameProduct);
    this.productService.search(this.nameProduct, this.model.category, this.page, this.resultByPage)
    .subscribe(result => this.myProducts = result, error => console.log(error));
  }
}
