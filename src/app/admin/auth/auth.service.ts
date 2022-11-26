import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {UserService} from "../shared/user/user.service";

interface Login {
  email: string,
  password: string,
}

@Injectable()
export class AuthService {
  isActivated: boolean = false;

  constructor(private http: HttpClient, private userService: UserService) {
  }
  login(body: Login) {
    return this.http
      .post<Login>('http://localhost:3000/user/login', body)
      .pipe(
        tap( (response: any) =>{
          this.userService.handleAuthentication(response.firstName, response.lastName, response.email, response.token, response.exDate);
        }),
        catchError(this.errorHandler)
      );
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
