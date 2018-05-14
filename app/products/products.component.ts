import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs';
import { DataGridModule } from 'primeng/datagrid';
import { PanelModule } from 'primeng/panel';
import { SelectItem } from 'primeng/api';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SpinnerModule } from 'primeng/spinner';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PanierService } from '../panier.service';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  //model: Product = new Product(0, "", "", 0, "", 0, "", false, "");//utile?
  submitted = false;
  myProducts: Product[];
  name: string = "";
  category: string = "";//utile?
  page: number = 1;
  resultByPage: number = 1000;
  avalaibleCategories: SelectItem[] = [];
  selectedTypes: string[];
  display: boolean = false;
  selectedProduct: Product;
  msgs: Message[] = [];

  qtyCmd:number=0;

  constructor(private productService: ProductService, private panierService: PanierService) {
    this.productService = productService;
    this.panierService = panierService;
  }


  ngOnInit() {
    this.productService.getProducts().subscribe(myProducts => {
      this.myProducts = myProducts;
      this.myProducts = this.myProducts.sort((a, b) => a.price - b.price);
    });
    this.productService.getCategories().subscribe(myAvalaibleCategories => {
      for (let catStr of myAvalaibleCategories) {
        this.avalaibleCategories.push({ label: catStr, value: catStr });
      }
    });
  }

  onSubmit() {
    this.submitted = true;

    let catStr = this.selectedTypes ? this.selectedTypes.join("-") : '';
    this.productService.search(this.name, catStr, this.page, this.resultByPage)
      .subscribe(result => this.myProducts = result.listSearch, error => console.log(error));
  }

  selectProduct(product: Product) {
    this.display = true;
    this.selectedProduct = product;
  }

  addToCart(product: Product) {
    this.msgs = [];
    this.selectedProduct = product;
    this.panierService.addProductToPanier(product, this.qtyCmd);
    this.msgs.push({
      severity: 'success',
      summary: "Votre produit à été ajouté au panier",
      detail: 'Vous pouvez continuer vos achats'
    });

    this.qtyCmd=0;
  }

}
