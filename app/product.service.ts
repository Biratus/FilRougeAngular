import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';
import { Response } from "@angular/http";

@Injectable()
export class ProductService {

  urlAdminProducts='http://localhost:8080/formafond';
  urlProducts='';


  constructor(private http: HttpClient) {
    this.http = http;
  }

  getProducts(): Observable<any>{
    return this.http.get(this.urlAdminProducts+"/Api/product/products");
  }

  saveProduct(product: Product): Observable<any> {
    return this.http.post<Product>(this.urlProducts, product);
  }

  removeProduct(product: Product): Observable<any> {
    return this.http.delete<Product>(this.urlProducts);
  }

  update(product: Product) {
    return this.http.put("http://localhost:8080/formafond/Api/product", product);
  }

  removeProductById(id: number): Observable<any> {
    return this.http.delete<Product>(this.urlProducts+"/"+id);
  }

  search(name, category, page, resultByPage): Observable<any> {
    return this.http.get("http://localhost:8080/formafond/Api/product/search?"+ 
    "name="+name+ 
    "&category="+category+ 
    "&page="+page+
    "&resultByPage="+resultByPage);
  }

}
