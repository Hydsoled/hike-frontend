import {Injectable} from "@angular/core";
import {User} from "../../auth/user.model";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class UserService {
  token: string = '';
  user = new BehaviorSubject<any>(null);
  constructor() {
  }

  handleAuthentication(firstName: string, lastName: string, email: string, token: any, exDate: number){
    const user = new User(
      firstName,
      lastName,
      email,
      token,
      exDate
    );
    this.user.next(user);
    this.token = token;
    localStorage.setItem('userData', JSON.stringify(user));
  }

  verifyUser(){
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.access_token,
      userData.exDate
    );
    if (loadedUser.token){
      this.token = loadedUser.token;
      this.user.next(loadedUser);
    }
  }
}
