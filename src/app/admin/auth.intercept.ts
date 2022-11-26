import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {exhaustMap, take} from "rxjs";
import {UserService} from "./shared/user/user.service";

@Injectable()
export class AuthIntercept implements HttpInterceptor {

  constructor(private userService: UserService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler){
    return this.userService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const addAuth = req.clone({
          setHeaders: {
            authorization: 'Bearer ' + this.userService.token,
          }
        });
        return next.handle(addAuth);
      })
    );
  }
}
