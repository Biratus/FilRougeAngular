import { Component, OnInit } from '@angular/core';
import {Product} from '../product';
import {ProductService} from '../product.service';
import {DataTableModule} from 'primeng/datatable';
import {TableModule} from 'primeng/table';
import {CheckboxModule} from 'primeng/checkbox';
import {DataGridModule} from 'primeng/datagrid';
import {PanelModule} from 'primeng/panel';
import {DialogModule} from 'primeng/dialog';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  myProducts: Product[];
  selectedProduct: Product;
  cols: any[];
  page: number=1;
  resultByPage:number=10;
  model: Product = new Product(0, "", "", 0, "", 0, "",false,"");
  name:string="";
  category:string="";
  id:number=0;
  submitted=false;
  display: boolean = false;


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
      { field: 'qty', header: 'Quantité'}
    ];
  }

  onSubmit(name,cat){
    this.submitted=true;
    this.productService.search(name, cat, this.page, this.resultByPage)
      .subscribe(result => {console.log(result);this.myProducts = result;}, error => console.log(error));
  }

  // redirect(event){
  //   console.log("mon produit");
  //   console.log(event);
  // }

  input(name:string, category:string){
    if(name){
      this.name=name;
    }
    if(category){
      this.category=category;
    }
  }

  removeProduct(id:number){
    this.id=id;
    this.productService.removeProductById(id).subscribe(() => this.ngOnInit());
    this.myProducts=[...this.myProducts]; 
  }

  selectProduct(product: Product) {
    this.display=true;
    this.selectedProduct = product;
    
  }

  updateProduct(product:Product){
    console.log(product);
    this.productService.update(product).subscribe(()=>this.ngOnInit());
    this.myProducts=[...this.myProducts];
  }

  onDialogHide() {
    this.selectedProduct = null;
    
  }
}
