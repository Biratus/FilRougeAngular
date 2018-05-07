import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../commande.service';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { Commande } from '../commande';
import { User } from '../user.model';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {
  display: boolean = false;
  selectedCommande: Commande;
  private total: number;
  mesCommandes = new Array<Commande>();
  model: Commande = new Commande(0, null,  null,null);
  constructor(private commandeService: CommandeService ,private produitService: ProductService) { }

  ngOnInit() {
     //this.commandeService.getCommande().subscribe(commandes => this.mesCommandes = commandes);
     this.mesCommandes.push({"id_commande":1,"date":null,"products":[new Product(1,"name2","type",50,"category",5,"",true,"description2"),
                                                                   new Product(2,"name3","type",50,"category",60,"",true,"description3")
     ],"user":new User("slimane","slimane","adr","aa.aa@gmail.com",123456,"admin","pass")});
     this.mesCommandes.push({"id_commande":1,"date":null,"products":[new Product(1,"name2","type",50,"category",5,"",true,"description2"),
                                                                   new Product(2,"name3","type",50,"category",60,"",true,"description3")
     ],"user":new User("slimane","slimane","adr","aa.aa@gmail.com",123456,"admin","pass")});
    
   
     this.parcourir();    }
    updateTotal() {
      this.total = 0;
      for(let element of this.mesCommandes) {
        //this.total += element.prix_unitaire * element.nombre_produits;
      }

}


parcourir(){
  for(let entry of this.mesCommandes){
  for(let p of entry.products){
    this.total += p.price * p.qty;
  
  console.log(p);
  
}
}

//System.out.println("Élément à l'index " + i + " = " + l.get(i));

}
selectedOrder(commande: Commande) {
   
  this.display=true;
  console.log(commande);
  this.selectedCommande = commande;
}

onDialogHide() {
  this.selectedCommande = null;
}

}
