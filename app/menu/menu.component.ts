import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {User} from './../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items: MenuItem[];

  constructor(private uServ:UserService) {
    this.uServ=uServ;
  }

  ngOnInit() {
    this.buildItems(new User("","","","",0,"",""));
    //this.uServ.getConnectedUser().subscribe(user => this.buildItems(User.fromJSON(user)));
  }

  buildItems(u:User) {
    
  }

}
