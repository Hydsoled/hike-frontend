import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "./auth/auth.service";
import {Injectable} from "@angular/core";
import {exhaustMap, take} from "rxjs";

@Injectable()
export class AuthIntercept implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler){
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const addAuth = req.clone({
          setHeaders: {
            authorization: 'Bearer ' + this.authService.token,
          }
        });
        return next.handle(addAuth);
      })
    );
  }
}
