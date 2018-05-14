import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../commande.service';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { Commande } from '../commande';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {
  display: boolean = false;
  selectedCommande: Commande;
  private total: number;
  curentUser: User;
  mesCommandes = new Array<Commande>();
  hasOrder: boolean = false;
  model: Commande = new Commande(0, null, null, 0);


  constructor(private commandeService: CommandeService, private produitService: ProductService, private userService: UserService) { }

  ngOnInit() {
    this.userService.getConnectedUser().subscribe(user => {
      this.curentUser = User.fromJSON(user);

      this.commandeService.getOrderOfUser(user.id).subscribe(commandes => {
        this.mesCommandes = commandes.orders;
        this.hasOrder = commandes.orders.length > 0;
      });

    });
  }

  nbProduit(comm: Commande): number {
    let total = 0;
    for (let p of comm.products) {
      total += p.qty;
    }
    return total;
  }
  prixTotal(comm: Commande): number {
    let prix = 0;
    for (let p of comm.products) {
      prix += p.qty * p.price;
    }
    return prix;
  }

  selectedOrder(commande: Commande) {
    this.display = true;
    this.selectedCommande = commande;
  }

  onDialogHide() {
    this.selectedCommande = null;
  }

}
