import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  product:Product;

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

      
  }

  
}
// OnSubmit(form: NgForm) {
//   this.productService.update(form.value.productId)
//   .subscribe(data => {
//     this.resetForm(form);

//   }

// }
