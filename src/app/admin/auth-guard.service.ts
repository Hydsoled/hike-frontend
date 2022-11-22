import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import { Observable, take } from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth/auth.service";
import {map} from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    this.authService.verifyUser();
    return this.authService
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
