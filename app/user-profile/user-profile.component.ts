import { Component, OnInit } from '@angular/core';
import { User } from './../user.model';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PanierService } from '../panier.service';
import { PanierComponent } from './../panier/panier.component';
import { ProfileDetailComponent } from './../profile-detail/profile-detail.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {

  user: User;
  visibility: any = {
    "app-profile-detail": false,
    "app-user-order": true,
    "app-panier": true
  }

  constructor(private uServ: UserService, private panierServ: PanierService, private route: ActivatedRoute, private router: Router) {
    this.uServ = uServ;
    this.route = route;
    this.router = router;
    this.route.queryParamMap.subscribe(map => {
      if (map.get('page')) {
        let page = map.get('page');
        if (page == 'panier') {
          this.display('app-panier');
        } else if (page == 'commande') {
          this.display('app-orders');
        }
      }
    });
    this.panierServ = panierServ;
  }

  ngOnInit() {
    this.uServ.getConnectedUser().subscribe(jsonU => {
      this.user = User.fromJSON(jsonU);
    });
    //if user is visitor and wants to check other than cart
    if (!this.uServ.getConnectedUserInSession() && this.visibility['app-panier']) {
      this.router.navigate(["/authentification"], {
        queryParams: {
          severity: "warn",
          summary: "Vous n'êtes pas connecté",
          message: "Connectez-vous afin de pouvoir accéder à votre profile."
        }
      });
    }
    for (let comp in this.visibility) {
      if (!this.visibility[comp]) {
        document.getElementById(comp).classList.add("active");
      }
    }
  }

  productNumber() {
    let panier = this.panierServ.getCurrentPanier();
    return panier ? panier.length : 0;
  }

  display(component) {
    //if visitor tries to access something other than cart
    if (!this.uServ.getConnectedUserInSession() && component!='app-panier') {
      this.router.navigate(["/authentification"], {
        queryParams: {
          severity: "warn",
          summary: "Vous n'êtes pas connecté",
          message: "Connectez-vous afin de pouvoir accéder à votre profile."
        }
      });
      return;
    }
    for (let comp in this.visibility) {
      this.visibility[comp] = true;
    }
    this.visibility[component] = false;
  }

  logout() {
    this.uServ.logout();
    sessionStorage.clear();
    this.router.navigate(['/authentification']);
  }
}
