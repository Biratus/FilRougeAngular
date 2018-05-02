import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { NgForm } from '@angular/forms';
import {FileUploadModule} from 'primeng/fileupload';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  product:Product;
  uploadedFiles: any[] = [];

  constructor(private productService: ProductService) { }


  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.product = {
      name: '',
      type: '',
      price: null,
      category:'',
      qty: null,
      src:''

    }
  }

  ngOnInit() {
    this.resetForm();
  }

  OnSubmit(form: NgForm) {
    this.productService.saveProduct(form.value)
      .subscribe((data: any) => {
        if (data.Succeeded == true) {
          this.resetForm(form);
      
        }
    
      });
  }

  //onUpload(event) {}


}
