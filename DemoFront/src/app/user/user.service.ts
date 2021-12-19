import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl: string;
  public  connectedUser : User ;
  constructor(private http: HttpClient) {
    this.userUrl = 'http://localhost:8080/User';
  }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl + '/getUsers');
  }
  public getUserByMail(mail: string) {
    return this.http.get<User>(this.userUrl + '/getUserByMail/'+mail);
  }

  public addUser(user: User) {
    return this.http.post<User>(this.userUrl + '/addUser', user);
  }


}
