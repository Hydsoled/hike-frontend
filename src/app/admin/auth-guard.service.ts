import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import { Observable, take } from "rxjs";
import {Injectable} from "@angular/core";
import {map} from "rxjs/operators";
import {UserService} from "./shared/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    this.userService.verifyUser();
    return this.userService
      .user
      .pipe(
        take(1),
        map(val=>{
          if (!val){
            return this.router.navigate(['/admin/auth']);
          }
          return true;
        })
      );
  }

}
