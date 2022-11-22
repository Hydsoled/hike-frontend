import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {User} from "./user.model";

interface Login {
  email: string,
  password: string,
}

@Injectable()
export class AuthService {
  isActivated: boolean = false;
  token: string = '';
  user = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
  }
  login(body: Login) {
    return this.http
      .post<Login>('http://localhost:3000/user/login', body)
      .pipe(
        tap( (response: any) =>{
          this.handleAuthentication(response.email, response.token, response.exDate);
        }),
        catchError(this.errorHandler)
      );
  }

  handleAuthentication(email: string, token: any, exDate: number){
    const user = new User(
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
      userData.email,
      userData.access_token,
      userData.exDate
    );
    if (loadedUser.token){
      this.token = loadedUser.token;
      this.user.next(loadedUser);
    }
  }

  private errorHandler(error: HttpErrorResponse): Observable<any> {
    let errorMessage = 'An unknown error occured!';
    if (!error.error){
      return throwError(errorMessage);
    }
    switch (error.error.message){
      case 'INCORRECT_PASSWORD':
        errorMessage = 'Incorrect password!';
        break;
    }
    return throwError(errorMessage);
  }
}
