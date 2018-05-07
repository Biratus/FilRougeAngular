import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Response } from "@angular/http";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CommandeService {


  urlAdminProducts='http://localhost:8082/formafond';
  urlProducts='http://localhost:8082/formafond/Api/product';

  constructor(private http: HttpClient) {
    this.http = http;
  }

  getCommande(): Observable<any>{

    return this.http.get(this.urlAdminProducts+"/Api/order");
    
  }
  

  
 
}
