import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../interface/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API = {
    getUserList: 'https://jsonplaceholder.typicode.com/users'
  }

  constructor(
    private http: HttpClient,
  ) {
  }

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(this.API.getUserList)
  }

}
