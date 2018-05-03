import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Response } from "@angular/http";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  readonly rootUrl = 'http://localhost:8082/formafond';
  constructor(private httpClient: HttpClient) {
    this.httpClient = httpClient;
  }


  userAuthentification(user: User): Observable<any> {

    return this.httpClient.post(this.rootUrl + '/authenticate?username='+user.mail+'&password='+user.password,null);
  }


  registerUser(user: User):Observable<any> {
    return this.httpClient.post(this.rootUrl + '/api/user', user);
  }

  getConnectedUser():any {
    return User.fromJSON(sessionStorage.getItem('user'));
  }

}
