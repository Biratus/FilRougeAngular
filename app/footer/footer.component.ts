import { Component, OnInit } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  menu: MenuItem[];

  constructor() { }

  ngOnInit() {
    this.menu = [
      { label: 'Informations', icon: 'far fa-comment' },
      { label: 'CGU', icon: 'fas fa-comment-dots' },
      { label: 'CGV', icon: 'far fa-comment-dots' },
      { label: 'Réseaux sociaux', icon: 'fa fa-facebook-square' },
      { label: 'Nous contacter', icon: 'fas fa-dove' }
    ]
  }

}
