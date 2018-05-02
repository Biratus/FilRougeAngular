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
  model: Product = new Product(0, "", "", 0, "", 0, "");
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
    console.log("submitted done " + $('#namesearch').val());
    this.productService.search($('#namesearch').val(), this.model.category, this.page, this.resultByPage)
      .subscribe(result => this.myProducts = result, error => console.log(error));
    // console.log(this.model);
  }
}
