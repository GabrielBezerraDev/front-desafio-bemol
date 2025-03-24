import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserGetInterface, UserLoginInterface } from '../../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  public postSessionLogin(userLogin:UserLoginInterface):Observable<UserGetInterface>{
    return this.httpClient.post<UserGetInterface>("http://localhost:3000/auth/login",userLogin);
  }

  public postUser(userLogin:UserLoginInterface):Observable<UserGetInterface>{
    return this.httpClient.post<UserGetInterface>("http://localhost:3000/auth/sign-up",userLogin);
  }


}
