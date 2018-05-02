import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {User} from './../user.model';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items: MenuItem[];

  constructor(private uServ:UserService,private route: ActivatedRoute, private router: Router) {
    this.uServ=uServ;
    this.route=route;
    this.router=router;
  }

  ngOnInit() {
    this.buildItems(new User("","","","",0,"admin",""));
    //this.uServ.getConnectedUser().subscribe(user => this.buildItems(User.fromJSON(user)));
  }

  buildItems(u:User) {
    this.items=[{label:"Accueil",routerLink:'/'},{label:"Shopping",icon:"fa fa-shopping-cart",routerLink:"/Products"}];
    if(u.role.toLowerCase()=="admin") {
      this.items.push({label:"Gestion des produits",routerLink:'/AdminProducts'},{label:"Gestion des commandes",routerLink:'/AdminOrders'});
    }
  }

  goToProfile() {
    //check visitor/user/admin
    console.log("go to profile");
  }

  goToCart() {
    console.log("go to cart");
  }

}
