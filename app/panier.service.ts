import { Injectable } from '@angular/core';
import {Product} from './product';

@Injectable()
export class PanierService {

  constructor() { }

  getCurrentPanier():Product[] {
    let prodList=sessionStorage.getItem('panier');
    if(prodList==null) return null;
    else return (JSON.parse(prodList) as any[]).map(obj => Product.fromJson(obj));
  }

  addProductToPanier(p:Product,qty:number) {
    let currPanier=JSON.parse(sessionStorage.getItem('panier'));
    p.qty=qty;
    if(currPanier==null) currPanier=[];
    currPanier.push(p);
    sessionStorage.setItem("panier",JSON.stringify(currPanier));
  }

  removeProductFromPanier(prod_id:number)  {
    let currPanier=JSON.parse(sessionStorage.getItem('panier'));
    if(currPanier==null) return;
    currPanier=currPanier.filter(p => p.id!=prod_id);
    sessionStorage.setItem("panier",JSON.stringify(currPanier));
  }

  setProductQtyInPanier(prod_id:number,qty:number) {
    let currPanier=JSON.parse(sessionStorage.getItem('panier'));
    if(currPanier==null) return;
    currPanier=currPanier.map(p => {
      if(p.id==prod_id) p.qty=qty;
    });
    sessionStorage.setItem("panier",JSON.stringify(currPanier));
  }

}
