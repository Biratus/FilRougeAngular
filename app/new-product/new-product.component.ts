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
  myProducts: Product[];

  constructor(private productService: ProductService) {
    this.productService = productService;
   }


  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.product =new Product(0,'','',0,'',0,'',false);
  }

  ngOnInit() {
    this.resetForm();
    this.productService.getProducts().subscribe
    (myProducts => this.myProducts = myProducts);
  }

  OnSubmit(form: NgForm) {
  // console.log(form.value);
    // this.productService.saveProduct(form.value)
    //   .subscribe((data: any) => {
    //     if (data.Succeeded == true) {
    //       this.resetForm(form);
      
    //     }
    
    //   });

    this.productService.saveProduct(form.value).subscribe
    (newProduct => this.myProducts = newProduct);
    this.resetForm(form);
  }

  //onUpload(event) {}


}
