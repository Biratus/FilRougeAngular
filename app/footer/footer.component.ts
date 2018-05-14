import { Component, OnInit } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  menu: MenuItem[];
  activeItem: MenuItem;
  visibility: any = {
    "app-infos": false,
    "app-cgu": true,
    "app-cgv": true,
    "app-social": true,
    "app-contact": true
  }

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route = route;
    this.router = router;
  }

  ngOnInit() {
    this.menu = [
      { label: 'Informations', icon: 'fa fa-info', command: (evt) => this.display("app-infos") },
      { label: 'CGU', icon: 'fa fa-comment', command: (evt) => this.display("app-cgu") },
      { label: 'CGV', icon: 'fa fa-barcode', command: (evt) => this.display("app-cgv")  },
      { label: 'Réseaux sociaux', icon: 'fa fa-facebook-square', command: (evt) => this.display("app-social")  },
      { label: 'Nous contacter', icon: 'fa fa-envelope', command: (evt) => this.display("app-contact")  }
    ];
    this.activeItem = this.menu[0];
  }

  display(component) {
    for (let comp in this.visibility) {
      this.visibility[comp] = true;
    }
    this.visibility[component] = false;
  }
}
