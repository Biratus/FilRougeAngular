import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { PanierService } from '../panier.service';
import { CommandeService } from '../commande.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  monPanier = new Array<Product>();
  private total: number;

  constructor(private panierService: PanierService,private commandeService:CommandeService,private userService:UserService) {
    this.panierService=panierService;
    this.commandeService=commandeService;
   }

  ngOnInit() {
    //remove from here
    this.monPanier.push(new Product(0,"name","type",50,"category",5,"",true,"description"));
    this.monPanier.push(new Product(1,"name2","type",50,"category",5,"",true,"description2"));
    this.monPanier.push(new Product(2,"name3","type",50,"category",60,"",true,"description3"));
    sessionStorage.setItem('panier',JSON.stringify(this.monPanier));
//to here

    this.monPanier=this.panierService.getCurrentPanier();
  
  }

  deleteArticle(index: number) {
    this.panierService.removeProductFromPanier(index);
    this.monPanier=this.panierService.getCurrentPanier();
    
  }
  updateTotal() {
    this.total = 0;
    for(let element of this.monPanier) {
      this.total += element.price * element.qty;
    }
    return this.total;
  }
  quantityChange(event,id_produit){
   this.panierService.setProductQtyInPanier(id_produit,event.target.valueAsNumber);
   this.monPanier=this.panierService.getCurrentPanier();
  }

  checkout() {
    this.userService.getConnectedUser().subscribe(user => {
      this.commandeService.createCommande(user);
      //empty panier
      //display message success
    },error => {
      //display error message
    });
  }
}
