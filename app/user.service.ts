import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Response } from "@angular/http";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppModule } from './app.module';

@Injectable()
export class UserService {
  static readonly restApi = '/api/user';

  constructor(private httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  userAuthentification(username, password): Observable<any> {

    return this.httpClient.post(AppModule.restApi + '/authenticate?username=' + username + '&password=' + password, null);
  }

  registerUser(user: User): Observable<any> {
    return this.httpClient.post(AppModule.restApi + UserService.restApi, user);
  }

  getConnectedUser(): Observable<any> {
    return this.getUser(sessionStorage.getItem('user'));
  }

  setConnectedUser(u: User) {
    sessionStorage.setItem('user', u.mail);
  }

  updateUser(u: User): Observable<any> {
    return this.httpClient.put(AppModule.restApi + UserService.restApi, u);
  }

  getUser(username): Observable<any> {
    return this.httpClient.get(AppModule.restApi + UserService.restApi + "/byName?name=" + username);
  }

  getUserById(id): Observable<any> {
    return this.httpClient.get(AppModule.restApi + UserService.restApi + '/' + id);
  }
}
