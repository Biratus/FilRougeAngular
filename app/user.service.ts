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
    console.log(user);
    console.log(UserService.rootUrl + '/api/user');
    let dummy={"mail":"lolol","password":"password"};
    return this.httpClient.post('http://localhost:8082/formafond/api/user', dummy);
  }

  getConnectedUser(): Observable<any> {
    return this.getUser(sessionStorage.getItem('user'));
  }

  setConnectedUser(u: User) {
    sessionStorage.setItem('user', u.mail);
  }

  updateUser(u: User): Observable<any> {
    return this.httpClient.put(UserService.rootUrl + "/api/user", u);
  }

  getUser(username): Observable<any> {
    return this.httpClient.get(UserService.rootUrl + "/api/user/byName?name=" + username);
  }

  getUserById(id) :Observable<any> {
    return this.httpClient.get('http://localhost:8082/formafond/api/user/'+id);
  }
}
