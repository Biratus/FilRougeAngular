import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs';
import { DataGridModule } from 'primeng/datagrid';
import { PanelModule } from 'primeng/panel';
import { SelectItem } from 'primeng/api';
import { SelectButtonModule } from 'primeng/selectbutton';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  model: Product = new Product(0, "", "", 0, "", 0, "", false,"");
  submitted = false;
  myProducts: Product[];
  name:string="";
  category:string="";
  page: number = 1;
  resultByPage: number = 9;
  nameProduct = "";
  avalaibleCategories: SelectItem[]=[];
  selectedTypes: string[];

  constructor(private productService: ProductService) {
    this.productService = productService;
  }


  ngOnInit() {
    this.productService.getProducts().subscribe(myProducts => this.myProducts = myProducts);
    this.productService.getCategories().subscribe(myAvalaibleCategories =>{
       for(let catStr of myAvalaibleCategories) {
         this.avalaibleCategories.push( {label: catStr, value: catStr});
       }
      });
  }

  onSubmit(nameProduct: string) {
    this.submitted = true;
    if (nameProduct) {
      this.nameProduct = nameProduct;
    }
    let catStr=this.selectedTypes?this.selectedTypes.join("-"):'';
    this.productService.search(this.nameProduct, catStr, this.page, this.resultByPage)
      .subscribe(result => this.myProducts = result, error => console.log(error));
  }
}
