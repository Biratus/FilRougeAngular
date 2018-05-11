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
  model: Commande = new Commande(0, null, null, null);
  hasOrder:boolean=false;


  constructor(private commandeService: CommandeService, private produitService: ProductService, private userService: UserService) { }

  ngOnInit() {
    //this.commandeService.getCommande().subscribe(commandes => this.mesCommandes = commandes);
    //  this.mesCommandes.push({"id_commande":1,"date":null,"products":[new Product(1,"name2","type",50,"category",5,"",true,"description2"),
    //                                                                new Product(2,"name3","type",50,"category",60,"",true,"description3")
    //  ],"user":new User("slimane","slimane","adr","aa.aa@gmail.com","123456","admin","pass")});
    //  this.mesCommandes.push({"id_commande":1,"date":null,"products":[new Product(1,"name2","type",50,"category",5,"",true,"description2"),
    //                                                                new Product(2,"name3","type",50,"category",60,"",true,"description3")
    //  ],"user":new User("slimane","slimane","adr","aa.aa@gmail.com","123456","admin","pass")});
  this.userService.getConnectedUser().subscribe(user=>{
    this.curentUser=User.fromJSON(user);
    console.log(user)

    this.commandeService.getOrderOfUser(user.id).subscribe(commandes => {
      this.mesCommandes = commandes.orders ;
      this.hasOrder=commandes.orders.length>0;
      console.log("mes commande");
      console.log(this.mesCommandes); 
      this.parcourir(); 
    }); 
     
   });
    
    /**    return this.http.get(CommandeService.restApi + "/api/user/" + id + "/orders:") as any[]).map(obj => Commande.fromJson(obj));
 */
    // this.commandeService.getCommande().subscribe(commandes => { 
    //   this.mesCommandes = commandes 
    //   console.log(this.mesCommandes); 
    //   this.parcourir(); 
    // }); 
  }
  
  updateTotal() {
    this.total = 0;
    for (let element of this.mesCommandes) {
      //this.total += element.prix_unitaire * element.nombre_produits;
    }

  }
  nbProduit(comm:Commande):number { 
    let total=0; 
    for (let p of comm.products) { 
      total+= p.qty; 
    } 
    return total; 
  } 
  prixTotal(comm:Commande):number { 
    let prix=0; 
    for (let p of comm.products) { 
      prix+= p.qty*p.price; 
    } 
    return prix; 
  } 

  parcourir() {
    for (let entry of this.mesCommandes) {
      for (let p of entry.products) {
        this.total += p.price * p.qty;

        console.log(p);

      }
    }

    //System.out.println("Élément à l'index " + i + " = " + l.get(i));

  }
  selectedOrder(commande: Commande) {

    this.display = true;
    console.log(commande);
    this.selectedCommande = commande;
  }

  onDialogHide() {
    this.selectedCommande = null;
  }

}
