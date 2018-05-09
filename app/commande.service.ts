import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Response } from "@angular/http";
import { HttpClient } from '@angular/common/http';
import { PanierService } from './panier.service';
import { User } from './user.model';

@Injectable()
export class CommandeService {

  static readonly restApi = "http://localhost:8082/formafond/Api/order";

  constructor(private http: HttpClient, private panierService: PanierService) {
    this.http = http;
    this.panierService = panierService;
  }

  getCommande(): Observable<any> {

    return this.http.get(CommandeService.restApi);

  }

  createCommande(user: User) {
    let listprod = this.panierService.getCurrentPanier();
    this.http.post(CommandeService.restApi + "/order", { "products": listprod, "user": user });
  }
}
