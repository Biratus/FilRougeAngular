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
    "app-orders": true,
    "app-panier": true
  }

  constructor(private uServ: UserService, private panierServ: PanierService, private route: ActivatedRoute, private router: Router) {
    this.uServ = uServ;
    this.route = route;
    this.router = router;
    this.panierServ = panierServ;
  }

  ngOnInit() {
    this.user = this.uServ.getConnectedUser();
    this.user = new User("", "", "", "", 0, "user", "");
    if (this.user.role == "") this.router.navigate(['/forbidden']);
  }

  productNumber() {
    let panier = this.panierServ.getCurrentPanier();
    return panier ? panier.length : 0;
  }

  display(component) {
    for (let comp in this.visibility) {
      this.visibility[comp] = true;
    }
    this.visibility[component] = false;
  }
}
