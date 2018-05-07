import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { NgForm } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  product: Product;

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
    this.productService.saveProduct(form.value).subscribe(newProduct => {
      //display error/success message
      this.resetForm(form);
    });
  }

  onUpload(event) {
    console.log('onUpload');
    console.log(event);
    for (let file of event.files) {
      console.log(file);
    }
  }
}