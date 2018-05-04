import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { PanierService } from '../panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  monPanier = new Array<Product>();
  private total: number;

  constructor(private productService: ProductService, private panierService: PanierService) { }

  ngOnInit() {
    this.monPanier.push(new Product(0,"name","type",50,"category",5,"",true,"description"));
    this.monPanier.push(new Product(1,"name2","type",50,"category",5,"",true,"description2"));
    this.monPanier.push(new Product(2,"name3","type",50,"category",60,"",true,"description3"));
    sessionStorage.setItem('panier',JSON.stringify(this.monPanier));
    // this.productService.getProducts().subscribe(products => this.monPanier = products);
  }

  deleteArticle(index: number) {
    this.panierService.removeProductFromPanier(index);
    
  }
  updateTotal() {
    this.total = 0;
    for(let element of this.monPanier) {
      this.total += element.price * element.qty;
    }
    return this.total;
  }

}
