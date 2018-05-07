import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';
import { Response } from "@angular/http";
import { AppModule } from './app.module';

@Injectable()
export class ProductService {
  static readonly restApi = "/Api/product";

  /* urlAdminProducts='http://localhost:8082/formafond';
  ur */lProducts = 'http://localhost:8082/formafond/Api/product';

  constructor(private http: HttpClient) {
    this.http = http;
  }

  getProducts(): Observable<any> {
    return this.http.get(AppModule.restApi + ProductService.restApi + "/products");
  }

  saveProduct(product: Product): Observable<any> {
    return this.http.post(AppModule.restApi + ProductService.restApi, product);
  }

  update(product: Product) {
    return this.http.post(AppModule.restApi + ProductService.restApi, product);
  }

  removeProductById(id: number): Observable<any> {
    return this.http.delete<Product>(AppModule.restApi + ProductService.restApi + "/" + id);
  }

  getProductById(id): Observable<any> {
    return this.http.get(AppModule.restApi + ProductService.restApi + "/" + id);
  }

  search(name, category, page, resultByPage): Observable<any> {
    return this.http.get(AppModule.restApi + ProductService.restApi + "/search?" +
      "name=" + name +
      "&category=" + category +
      "&page=" + page +
      "&resultByPage=" + resultByPage);
  }

  getCategories(): Observable<any> {
    return this.http.get(AppModule.restApi + ProductService.restApi + "/categories");
  }

}
