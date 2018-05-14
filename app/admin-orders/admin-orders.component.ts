import { Component, OnInit } from '@angular/core';
import {CommandeService} from '../commande.service';
import {Commande} from '../commande';
import {UserService} from '../user.service';
import {User} from '../user.model';
import {CardModule} from 'primeng/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  colsOrders: any[];
  page: number;
  model: Commande= new Commande(0,new Date(),[],0);
  myOrders: Commande[];
  selectedOrder: Commande;
  display: boolean = false;

  constructor(private commandeService: CommandeService, private userService:UserService,private router:Router) {
    this.commandeService=commandeService;
    this.userService=userService;
   }

  ngOnInit() {

    this.commandeService.getCommande().subscribe(result => {
      this.myOrders = result.map(o => {
        let c=Commande.fromJson(o);
        this.userService.getUserById(o.user_id).subscribe(user => c.user=User.fromJSON(user));
        return c;
      });
      this.myOrders = this.myOrders.sort((a, b) => a.id - b.id);
    });
    

    this.colsOrders = [
      { field: 'id', header: 'Numéro de commande' },
      { field: 'date', header: 'Date' },
      { field: 'products', header: 'Produits' },
      { field: 'order.user.lastname', header: 'Nom utilisateur' }
    ];

    if (!this.userService.getConnectedUserInSession()) {
      this.router.navigate(["/authentification"], {
        queryParams: {
          severity: "warn",
          summary: "Vous n'êtes pas connecté",
          message: "Connectez-vous afin de pouvoir accéder à votre profile."
        }
      });
    }
  }

  selectOrder(order: Commande) {
    this.display = true;
    this.selectedOrder = order;
  }

  onDialogHide() {
    this.selectedOrder = null;
  }
}
