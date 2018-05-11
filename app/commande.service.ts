import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Response } from "@angular/http";
import { HttpClient } from '@angular/common/http';
import { PanierService } from './panier.service';
import { User } from './user.model';
import { Commande } from './commande';

@Injectable()
export class CommandeService {

  static readonly restApi = "http://localhost:8082/formafond/Api/order";
  static readonly  restApiUser = "http://localhost:8082/formafond"

  constructor(private http: HttpClient, private panierService: PanierService) {
    this.http = http;
    this.panierService = panierService;
  }

  getCommande(): Observable<any> {

    return this.http.get(CommandeService.restApi);

  }

  getOrderOfUser(id: number): Observable<any> {
    return this.http.get(CommandeService.restApiUser + "/api/user/" + id + "/orders");

  } 



  createCommande(user: User): Observable<any> {
    let listprod = this.panierService.getCurrentPanier();
    return this.http.post(CommandeService.restApi, { "products": listprod, "user": user });
  }

  isInOrder(productId:number): Observable<any>{
    return this.http.get("http://localhost:8082/formafond/Api/order/product/"+productId);
  }
}
