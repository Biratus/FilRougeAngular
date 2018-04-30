import { Injectable } from '@angular/core';
import { User } from './user.model';
import {  Response } from "@angular/http";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  readonly rootUrl = 'http://localhost:8085';
  constructor(private httpClient: HttpClient) {
    this.httpClient=httpClient;
   }


  userAuthentification(user : User):Observable<any>{
    
    const body: User = {

    lastName: user.lastName,
    firstName: user.firstName,
    mail: user.mail,
    address: user.address,
    phone: user.phone,
    UserName: user.UserName,
    Password: user.Password
    }

return null;
   // return this.httpClient.post(this.rootUrl + '/authenticate?username='+user.UserName+'&password='+user.Password,null);
  }


  registerUser(USER  : User){
    const body: User = {
      lastName: USER.lastName,
      firstName: USER.firstName,
      mail: USER.mail,
      address: USER.address,
      phone: USER.phone,
      UserName: USER.UserName,
      Password: USER.Password
    }
    return this.httpClient.post(this.rootUrl + '/api/user/Register', USER);
  
 
}

}
