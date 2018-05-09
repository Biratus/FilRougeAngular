import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { NgForm } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})

export class NewProductComponent implements OnInit {
  product: Product;
  msgs: Message[] = [];
  selectedFile: File = new File(null, "");

  readonly cat = { 'CLIMBING': 'Alpinisme / Escalade', 'DIVING': 'Plongée', 'HIKING': 'Randonnée' };

  constructor(private productService: ProductService) {
    this.productService = productService;
  }


  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.product = new Product(0, '', '', 0, '', 0, '', false, "");
  }

  ngOnInit() {
    this.resetForm();
  }

  OnSubmit(form: NgForm) {
    this.msgs = [];
    this.product.id = null;
    //save first time to get new id 
    this.productService.saveProduct(this.product).subscribe(newProduct => {
      //save image with id of product
      this.productService.saveImage(newProduct.id, this.selectedFile).subscribe(filePath => {
        //update new product with new src
        if (filePath.body) {
          newProduct.category = this.getCat(newProduct.category);
          newProduct.src = filePath.body;
          this.productService.saveProduct(newProduct).subscribe(data => {
            this.msgs.push({
              severity: 'success',
              summary: "Produit créé",
              detail: 'Le produit à bien été crée'
            });
            this.resetForm(form);
          });
        }

      });
    },
      error => {
        this.msgs.push({
          severity: 'error',
          summary: "Problème serveur",
          detail: 'Le produit n\'a pas pu être créer suite à une erreur du serveur.'
        });
      });
  }

  onUpload(event) {
    this.selectedFile = event.files[0];
  }

  getCat(str) {
    for (let i in this.cat) {
      if (i == str) return this.cat[i];
      else if (this.cat[i] == str) return i;
    }
    return "";
  }
}

