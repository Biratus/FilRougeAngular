import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { User } from './../user.model';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items: MenuItem[];

  constructor(private uServ: UserService, private route: ActivatedRoute, private router: Router) {
    this.uServ = uServ;
    this.route = route;
    this.router = router;
  }

  ngOnInit() {
    this.buildItems(new User("", "", "", "", 0, "", ""));
    
    //this.buildItems(this.uServ.getConnectedUser());
  }

  buildItems(u: User) {
    this.items = [{ label: "Accueil", routerLink: '/' }, { label: "Shopping", icon: "fa fa-shopping-cart", routerLink: "/Products" }];
    if (u && u.role.toLowerCase() == "admin") {
      this.items.push({ label: "Gestion des produits", routerLink: '/AdminProducts' }, { label: "Gestion des commandes", routerLink: '/AdminOrders' });
    }
  }

  goToCart() {
    console.log("go to cart");
  }

  goToProfile() {
    this.router.navigate(["/authentification"], {
      queryParams: {
        severity: "warn",
        summary: "Vous n'êtes pas connecté",
        message: "Connectez-vous afin de pouvoir accéder à votre profile."
      }
    });
    // if(this.uServ.getConnectedUser()) this.router.navigate(['/Profile']);
    // else this.router.navigate(['/authentification']);

  }

}
