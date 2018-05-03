import { Component, OnInit } from '@angular/core';
import {Product} from '../product';
import {ProductService} from '../product.service';
import {DataTableModule} from 'primeng/datatable';
import {TableModule} from 'primeng/table';
import {CheckboxModule} from 'primeng/checkbox';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  myProducts: Product[];
  cols: any[];
  page: number=1;
  resultByPage:number=9;
  model: Product = new Product(0, "", "", 0, "", 0, "",false);
  name:string="";
  category:string="";
  submitted=false;


  constructor(private productService: ProductService) {
    this.productService=productService;
  }

  ngOnInit() {
    
    this.productService.getProducts().subscribe(products=>this.myProducts=products);

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Nom' },
      { field: 'type', header: 'Type' },
      { field: 'price', header: 'Prix' },
      { field: 'category', header: 'Catégorie' },
      { field: 'qty', header: 'Quantité'},
      { field: 'activ', header: 'Actif'}
    ];
  }

  onSubmit(name,cat){
    this.submitted=true;
    this.productService.search(name, cat, this.page, this.resultByPage)
      .subscribe(result => {console.log(result);this.myProducts = result;}, error => console.log(error));
  }

  redirect(event){
    console.log("mon produit");
    console.log(event);
  }

  input(name:string, category:string){
    if(name){
      this.name=name;
    }
    if(category){
      this.category=category;
    }
  }
}
