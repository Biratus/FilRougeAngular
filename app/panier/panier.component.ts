import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { PanierService } from '../panier.service';
import { CommandeService } from '../commande.service';
import { UserService } from '../user.service';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  monPanier = new Array<Product>();

  msgs: Message[] = [];

  constructor(private panierService: PanierService, private commandeService: CommandeService, private userService: UserService) {
    this.panierService = panierService;
    this.commandeService = commandeService;
    this.userService = userService;
  }

  ngOnInit() {
    //remove from here
    // this.monPanier.push(new Product(0,"name","type",50,"category",5,"",true,"description"));
    // this.monPanier.push(new Product(1,"name2","type",50,"category",5,"",true,"description2"));
    // this.monPanier.push(new Product(2,"name3","type",50,"category",60,"",true,"description3"));
    //sessionStorage.setItem('panier',JSON.stringify(this.monPanier));
    //to here
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
    //console.trace("ceci est MON PANIER CULE " +this.monPanier);
    for (let element of this.monPanier) {
      total += element.price * element.qty;
    }
    return total;
  }

  quantityChange(event, id_produit) {
    this.panierService.setProductQtyInPanier(id_produit, event.target.valueAsNumber);
    this.monPanier = this.panierService.getCurrentPanier();
  }

  checkout() {
    this.userService.getConnectedUser().subscribe(user => {
      this.commandeService.createCommande(user).subscribe(data => {
        this.msgs.push({
          severity: 'success',
          summary: "Commande validée",
          detail: 'Votre panier à été validé, et votre commande créer.\nVous pouvez consulter vos commandes dans votre profil.'
        });
        this.panierService.clearPanier();
        //empty panier
        //display message success
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
