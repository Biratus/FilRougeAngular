import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { DataTableModule } from 'primeng/datatable';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { DataGridModule } from 'primeng/datagrid';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { Router, ActivatedRoute } from '@angular/router';
import { InputSwitchModule } from 'primeng/inputswitch';
import { forEach } from '@angular/router/src/utils/collection';
import { DropdownModule } from 'primeng/dropdown';
import { SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommandeService } from '../commande.service';
import {Message} from 'primeng/components/common/api';

interface Category {
  label: string;
  value: string;
}

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})


export class AdminProductsComponent implements OnInit {
  cat: SelectItem[];
  selectedCat: Category;
  checked1: boolean = false;
  checked2: boolean = true;
  myProducts: Product[];
  selectedProduct: Product;
  cols: any[];
  page: number = 1;
  resultByPage: number = 1000;
  model: Product = new Product(0, "", "", 0, "", 0, "", false, "");
  name: string = "";
  category: string = "";
  id: number = 0;
  submitted = false;
  display: boolean = false;
  productName: string = "";
  productQty: number = 0;
  productPrice: number = 0;
  productType: string = "";
  productDescript: string = "";
  activ: boolean;
  avalaibleCategories: SelectItem[] = [];
  selectedTypes: string[];
  msgs: Message[] = [];



  constructor(private productService: ProductService, private commandeService: CommandeService,
    private route: ActivatedRoute, private router: Router) {

    this.productService = productService;
    this.commandeService = commandeService;
    this.route = route;
    this.router = router;

    this.productService.getCategories().subscribe(myAvalaibleCategories => {
      for (let catStr of myAvalaibleCategories) {
        this.avalaibleCategories.push({ label: catStr, value: catStr });
      }
    });
  }

  ngOnInit() {

    this.productService.getProducts().subscribe(result => {
      this.myProducts = result.map(p => Product.fromJson(p));
      this.myProducts = this.myProducts.sort((a, b) => a.id - b.id);
    });



    this.cat = [
      { label: 'Alpinisme / Escalade', value: 'CLIMBING' },
      { label: 'Plongée', value: 'DIVING' },
      { label: 'Randonnée', value: 'HIKING' }
    ];

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Nom' },
      { field: 'type', header: 'Type' },
      { field: 'price', header: 'Prix' },
      { field: 'category', header: 'Catégorie' },
      { field: 'qty', header: 'Quantité' }
    ];
  }

  onSubmit(productName: string) {
    this.submitted = true;
    if (productName) {
      this.productName = productName;
    }
    console.log(productName);
    let catStr = this.selectedTypes ? this.selectedTypes.join("-") : '';
    this.productService.search(this.productName, catStr, this.page, this.resultByPage)
      .subscribe(result => this.myProducts = result.listSearch, error => console.log(error));
  }

  redirect() {
    this.router.navigate(['/newProduct']);
  }

  saveProduct(productName: string, productQty: number, productPrice: number, productType: string, productDescript: string) {

    if (productName) { this.productName = productName; }
    if (productQty) { this.productQty = productQty; }
    if (productPrice) { this.productPrice = productPrice; }
    if (productType) { this.productType = productType; }
    if (productDescript) { this.productDescript = productDescript; }

    this.selectedProduct.id = this.selectedProduct.id;
    this.selectedProduct.category = this.selectedProduct.category;
    this.selectedProduct.name = productName;
    this.selectedProduct.qty = productQty;
    this.selectedProduct.price = productPrice;
    this.selectedProduct.type = productType;
    this.selectedProduct.descript = productDescript;
    console.log(this.selectedProduct);

    this.productService.saveProduct(this.selectedProduct).subscribe(() => this.ngOnInit());
  }

  removeProduct(id: number) {
    this.id = id;
    this.productService.removeProductById(id).subscribe(() => this.ngOnInit());
  }

  selectProduct(product: Product) {
    this.display = true;
    this.selectedProduct = product;
  }

  activProduct(product: Product) {
    this.selectedProduct = product;
  }

  onOffProduct(activ) {

    this.commandeService.isInOrder(this.selectedProduct.id).subscribe(
       data => {
        if (data.orders.length == 0) {
          this.productService.activProduct(this.selectedProduct.id, activ).subscribe(() => this.ngOnInit());
            
        } else{this.alertOffProduct(this.selectedProduct.name); 
           this.productService.getProducts().subscribe(()=>this.ngOnInit());}
        
        
      });
      
  }

  alertOffProduct(productName:string){
    this.msgs = [];
    this.msgs.push({severity:'Error', summary:'Désactivation du produit', 
    detail:'Vous ne pouvez pas désactiver le produit '+productName+' car il est déjà commandé '});
  }

  onDialogHide() {
    this.selectedProduct = null;
  }
}
