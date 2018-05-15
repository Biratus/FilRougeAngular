import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { PanierService } from '../panier.service';
import { CommandeService } from '../commande.service';
import { UserService } from '../user.service';
import { Message } from 'primeng/components/common/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  monPanier = new Array<Product>();

  msgs: Message[] = [];

  constructor(private panierService: PanierService, private commandeService: CommandeService, private userService: UserService,private router:Router) {
    this.panierService = panierService;
    this.commandeService = commandeService;
    this.userService = userService;
    this.router=router;
  }

  ngOnInit() {
    if (this.panierService.getCurrentPanier())
      this.monPanier = this.panierService.getCurrentPanier();
  }

  deleteArticle(index: number) {
    this.panierService.removeProductFromPanier(index);
    this.monPanier = this.panierService.getCurrentPanier();
  }

  updateTotal() {
    //return this.monPanier.reduce((acc,elt)=>acc+=elt.price*elt.qty,0);
    let total = 0;

    for (let element of this.monPanier) {
      total += element.price * element.qty;
    }
    return total;
  }
  nbrProduit() {
    //return this.monPanier.reduce((acc,elt)=>acc+=elt.price*elt.qty,0);
    let nbr = 0;

    for (let prod of this.monPanier) {
      nbr +=  prod.qty;
    }
    return nbr;
  }
  quantityChange(event, id_produit) {
    this.panierService.setProductQtyInPanier(id_produit, event.target.valueAsNumber);
    this.monPanier = this.panierService.getCurrentPanier();
  }

  checkout() {//Validation de la commande
    if(!this.userService.getConnectedUserInSession()) {
      this.router.navigate(["/authentification"], {
        queryParams: {
          severity: "warn",
          summary: "Vous n'êtes pas authentifié",
          message: "Veuillez vous connectez ou créer votre compte afin de valider votre panier"
        }
      });
      return;
    }
    this.userService.getConnectedUser().subscribe(user => {
      this.commandeService.createCommande(user).subscribe(data => {
        //display message success
        this.msgs.push({
          severity: 'success',
          summary: "Commande validée",
          detail: 'Votre panier à été validé, et votre commande créer.\nVous pouvez consulter vos commandes dans votre profil.'
        });
        //empty panier
        this.panierService.clearPanier();
        this.ngOnInit();
      });
    }, error => {
      //display error message
      this.msgs.push({
        severity: 'error',
        summary: "Erreur",
        detail: 'Un erreur est survenue lors de la création de votre commande.'
      });
    });
  }
}
