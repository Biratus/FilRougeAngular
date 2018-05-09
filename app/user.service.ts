import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Response } from "@angular/http";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  static readonly restApi = 'http://localhost:8082/formafond/api/user';

  constructor(private httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  userAuthentification(username, password): Observable<any> {

    return this.httpClient.post('http://localhost:8082/formafond/authenticate?username=' + username + '&password=' + password, null);
  }

  registerUser(user: User): Observable<any> {
    return this.httpClient.post(UserService.restApi, user);
  }

  getConnectedUser(): Observable<any> {
    return this.getUser(sessionStorage.getItem('user'));
  }

  setConnectedUser(u: User) {
    sessionStorage.setItem('user', u.mail);
  }

  updateUser(u: User): Observable<any> {
    return this.httpClient.put(UserService.restApi, u);
  }

  getUser(username): Observable<any> {
    return this.httpClient.get(UserService.restApi + "/byName?name=" + username);
  }

  getUserById(id): Observable<any> {
    return this.httpClient.get(UserService.restApi + '/' + id);
  }

  logout(): Observable<any> {
    return this.httpClient.post('http://localhost:8082/formafond/logout', null, {});
  }

  removeConnectedUser() {
    sessionStorage.setItem('user',null);
    sessionStorage.setItem('panier',null);
  }
}
