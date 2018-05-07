import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Response } from "@angular/http";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  static readonly rootUrl = 'http://localhost:8082/formafond';
  constructor(private httpClient: HttpClient) {
    this.httpClient = httpClient;
  }


  userAuthentification(username, password): Observable<any> {

    return this.httpClient.post(UserService.rootUrl + '/authenticate?username=' + username + '&password=' + password, null);
  }


  registerUser(user: User): Observable<any> {
    return this.httpClient.post(UserService.rootUrl + '/api/user', user);
  }

  getConnectedUser(): any {
    return User.fromJSON(sessionStorage.getItem('user'));
  }

  setConnectedUser(u: User) {
    sessionStorage.setItem('user', JSON.stringify(u));
  }

  updateUser(u: User): Observable<any> {
    return this.httpClient.put(UserService.rootUrl + "/api/user", u);
  }

  getUser(username):Observable<any> {
    return this.httpClient.get(UserService.rootUrl+"/api/user/byName?name="+username);
  }
}
