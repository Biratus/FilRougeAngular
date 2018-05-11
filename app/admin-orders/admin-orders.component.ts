import { Component, OnInit } from '@angular/core';
import {CommandeService} from '../commande.service';
import {Commande} from '../commande';
@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  colsOrders: any[];
  page: number;
  model: Commande= new Commande(0,new Date(),[],null,0);
  myOrders: Commande[];
  selectedOrder: Commande;

  constructor(private commandeService: CommandeService) {
    this.commandeService=commandeService;
   }

  ngOnInit() {

    this.commandeService.getCommande().subscribe(result => {
      this.myOrders = result.map(o => Commande.fromJson(o));
      this.myOrders = this.myOrders.sort((a, b) => a.id - b.id);
      console.log(this.myOrders);
    });

    this.colsOrders = [
      { field: 'id', header: 'Numéro de commande' },
      { field: 'date', header: 'Date' },
      { field: 'products', header: 'Produits' },
      { field: 'user_id', header: 'Nom utilisateur' }
    ];
  }

  selectOrder(order: Commande) {
    this.selectedOrder = order;
  }
  
  totalPrice(order: Commande): number{
    let sum:number=0;
    for(let p of order.products ){
      sum+=p.price;
    }
    return sum;
  }

}
