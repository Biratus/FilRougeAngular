import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable()
export class PanierService {

  constructor() { }

  getCurrentPanier(): Product[] {
    let prodList = sessionStorage.getItem('panier');

    if (prodList != null) {
      return (JSON.parse(prodList) as any[]).map(obj => Product.fromJson(obj));
    } else return null;
  }

  addProductToPanier(p: Product, qty: number) {
    let currPanier = JSON.parse(sessionStorage.getItem('panier'));
    p.qty = qty;
    if (currPanier == null) currPanier = [];
    let isThere=false;
    for(let prodPan of currPanier) {
      if(prodPan.id==p.id) {
        isThere=true;
        prodPan.qty=qty;
        break;
      }
    }
    if(!isThere) currPanier.push(p);
    sessionStorage.setItem("panier", JSON.stringify(currPanier));
  }

  removeProductFromPanier(prod_id: number) {
    let currPanier = JSON.parse(sessionStorage.getItem('panier'));
    if (currPanier == null) return;
    currPanier = currPanier.filter(p => p.id != prod_id);
    sessionStorage.setItem("panier", JSON.stringify(currPanier));
  }

  setProductQtyInPanier(prod_id: number, qty: number) {
    let currPanier = JSON.parse(sessionStorage.getItem('panier'));
    if (currPanier == null) return;
    for (let p of currPanier) {
      if (p.id == prod_id) p.qty = qty;

    }
    sessionStorage.setItem("panier", JSON.stringify(currPanier));
  }

  clearPanier() {
    sessionStorage.setItem('panier', JSON.stringify([]));
  }

}
